import { useQuery, useMutation, mutationOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
  QueryClient,
} from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
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

export function get20100401AccountsJsonQueryOptions(options?: {
  headers?: Record<string, string>
  query?: Record<string, unknown>
}) {
  return {
    queryKey: get20100401AccountsJsonQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
  }
}

export function use20100401AccountsJson<TData = unknown, TError = unknown>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: get20100401AccountsJsonQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
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
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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

export function get20100401AccountsSidJsonQueryKey(params: MaybeRefOrGetter<string>) {
  return ['2010-04-01', '/2010-04-01/Accounts/{Sid}.json', toValue(params)] as const
}

export function get20100401AccountsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() => get20100401AccountsSidJsonQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsSidJson<
  TData = Static<typeof ApiV2010AccountSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountSchema>,
          ReturnType<typeof get20100401AccountsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() => get20100401AccountsSidJsonQueryKey(params)),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Addresses.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAddressesJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidAddressesJsonQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Addresses.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAddressesJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidAddressesJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAddressesJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Addresses.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountAddressSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidAddressesJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Addresses.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountAddressSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidAddressesSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAddressesSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Addresses/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAddressesSidJson<
  TData = Static<typeof ApiV2010AccountAddressSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountAddressSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountAddressSchema>,
          ReturnType<typeof get20100401AccountsAccountSidAddressesSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAddressesSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Addresses/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountAddressSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidAddressesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Addresses/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountAddressSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidAddressesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Addresses/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Applications.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidApplicationsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidApplicationsJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Applications.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidApplicationsJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidApplicationsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidApplicationsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Applications.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountApplicationSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidApplicationsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Applications.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountApplicationSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidApplicationsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidApplicationsSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Applications/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidApplicationsSidJson<
  TData = Static<typeof ApiV2010AccountApplicationSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountApplicationSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountApplicationSchema>,
          ReturnType<typeof get20100401AccountsAccountSidApplicationsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidApplicationsSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Applications/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountApplicationSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidApplicationsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Applications/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountApplicationSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidApplicationsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Applications/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AuthorizedConnectApps/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson<
  TData = Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey(
          params,
          params2,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AuthorizedConnectApps/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AuthorizedConnectApps.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAuthorizedConnectAppsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AuthorizedConnectApps.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson<
  TData = Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/Local.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/Local.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/MachineToMachine.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/MachineToMachine.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/Mobile.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/Mobile.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/National.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/National.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/SharedCost.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/SharedCost.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/TollFree.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/TollFree.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/Voip.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/AvailablePhoneNumbers/${encodeURIComponent(toValue(params2))}/Voip.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidBalanceJsonQueryKey(params: MaybeRefOrGetter<string>) {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Balance.json', toValue(params)] as const
}

export function get20100401AccountsAccountSidBalanceJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidBalanceJsonQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Balance.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidBalanceJson<
  TData = Static<typeof ApiV2010AccountBalanceSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountBalanceSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountBalanceSchema>,
          ReturnType<typeof get20100401AccountsAccountSidBalanceJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() => get20100401AccountsAccountSidBalanceJsonQueryKey(params)),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Balance.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidCallsJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidCallsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidCallsJsonQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidCallsJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidCallsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidCallsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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

export function get20100401AccountsAccountSidCallsSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidCallsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidCallsSidJsonQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidCallsSidJson<
  TData = Static<typeof ApiV2010AccountCallSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountCallSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountCallSchema>,
          ReturnType<typeof get20100401AccountsAccountSidCallsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() => get20100401AccountsAccountSidCallsSidJsonQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidCallsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidCallsCallSidEventsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Events.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidCallsCallSidEventsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Events.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Notifications/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidCallsCallSidNotificationsSidJson<
  TData = Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
          ReturnType<typeof get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Notifications/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Notifications.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidCallsCallSidNotificationsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Notifications.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Recordings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidCallsCallSidRecordingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Recordings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallCallRecordingSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidRecordingsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Recordings.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallCallRecordingSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey(params, params2, params3),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Recordings/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidCallsCallSidRecordingsSidJson<
  TData = Static<typeof ApiV2010AccountCallCallRecordingSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountCallCallRecordingSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountCallCallRecordingSchema>,
          ReturnType<typeof get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Recordings/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallCallRecordingSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidRecordingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Recordings/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallCallRecordingSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Recordings/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidConferencesSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidConferencesSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidConferencesSidJson<
  TData = Static<typeof ApiV2010AccountConferenceSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountConferenceSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountConferenceSchema>,
          ReturnType<typeof get20100401AccountsAccountSidConferencesSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidConferencesSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountConferenceSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidConferencesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountConferenceSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidConferencesJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidConferencesJsonQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidConferencesJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidConferencesJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidConferencesJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Recordings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidConferencesConferenceSidRecordingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Recordings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Recordings/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson<
  TData = Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Recordings/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Recordings/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Recordings/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidConnectAppsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidConnectAppsSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/ConnectApps/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidConnectAppsSidJson<
  TData = Static<typeof ApiV2010AccountConnectAppSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountConnectAppSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountConnectAppSchema>,
          ReturnType<typeof get20100401AccountsAccountSidConnectAppsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidConnectAppsSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/ConnectApps/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountConnectAppSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidConnectAppsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/ConnectApps/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountConnectAppSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidConnectAppsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/ConnectApps/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/ConnectApps.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidConnectAppsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidConnectAppsJsonQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/ConnectApps.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidConnectAppsJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidConnectAppsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidConnectAppsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/ConnectApps.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Addresses/${encodeURIComponent(toValue(params2))}/DependentPhoneNumbers.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Addresses/${encodeURIComponent(toValue(params2))}/DependentPhoneNumbers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersSidJson<
  TData = Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
          ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidIncomingPhoneNumbersSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidIncomingPhoneNumbersJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}/AssignedAddOns/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson<
  TData = Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}/AssignedAddOns/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}/AssignedAddOns/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}/AssignedAddOns.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}/AssignedAddOns.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}/AssignedAddOns.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
    toValue(params4),
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey(
        params,
        params2,
        params3,
        params4,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}/AssignedAddOns/${encodeURIComponent(toValue(params3))}/Extensions/${encodeURIComponent(toValue(params4))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson<
  TData = Static<
    typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
  >,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<
            typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
          >,
          TError,
          TData,
          Static<
            typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
          >,
          ReturnType<
            typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey(
          params,
          params2,
          params3,
          params4,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}/AssignedAddOns/${encodeURIComponent(toValue(params3))}/Extensions/${encodeURIComponent(toValue(params4))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey(
        params,
        params2,
        params3,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}/AssignedAddOns/${encodeURIComponent(toValue(params3))}/Extensions.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey(
          params,
          params2,
          params3,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/${encodeURIComponent(toValue(params2))}/AssignedAddOns/${encodeURIComponent(toValue(params3))}/Extensions.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/Local.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersLocalJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/Local.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/Local.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/Mobile.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersMobileJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/Mobile.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/Mobile.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/TollFree.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey(
          params,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/TollFree.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/IncomingPhoneNumbers/TollFree.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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

export function get20100401AccountsAccountSidKeysSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidKeysSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidKeysSidJsonQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Keys/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidKeysSidJson<
  TData = Static<typeof ApiV2010AccountKeySchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountKeySchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountKeySchema>,
          ReturnType<typeof get20100401AccountsAccountSidKeysSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() => get20100401AccountsAccountSidKeysSidJsonQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Keys/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountKeySchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidKeysSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Keys/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountKeySchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidKeysSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Keys/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Keys.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidKeysJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidKeysJsonQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Keys.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidKeysJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidKeysJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidKeysJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Keys.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountNewKeySchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidKeysJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Keys.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountNewKeySchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey(params, params2, params3),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages/${encodeURIComponent(toValue(params2))}/Media/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidMessagesMessageSidMediaSidJson<
  TData = Static<typeof ApiV2010AccountMessageMediaSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountMessageMediaSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountMessageMediaSchema>,
          ReturnType<typeof get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages/${encodeURIComponent(toValue(params2))}/Media/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages/${encodeURIComponent(toValue(params2))}/Media/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages/${encodeURIComponent(toValue(params2))}/Media.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidMessagesMessageSidMediaJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages/${encodeURIComponent(toValue(params2))}/Media.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues/${encodeURIComponent(toValue(params2))}/Members/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson<
  TData = Static<typeof ApiV2010AccountQueueMemberSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountQueueMemberSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountQueueMemberSchema>,
          ReturnType<typeof get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues/${encodeURIComponent(toValue(params2))}/Members/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return mutationOptions<
    Static<typeof ApiV2010AccountQueueMemberSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues/${encodeURIComponent(toValue(params2))}/Members/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountQueueMemberSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues/${encodeURIComponent(toValue(params2))}/Members.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidQueuesQueueSidMembersJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues/${encodeURIComponent(toValue(params2))}/Members.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidMessagesJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidMessagesJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidMessagesJsonQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidMessagesJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidMessagesJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidMessagesJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountMessageSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidMessagesJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountMessageSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidMessagesSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidMessagesSidJsonQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidMessagesSidJson<
  TData = Static<typeof ApiV2010AccountMessageSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountMessageSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountMessageSchema>,
          ReturnType<typeof get20100401AccountsAccountSidMessagesSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidMessagesSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountMessageSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidMessagesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountMessageSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidMessagesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountMessageMessageFeedbackSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidMessagesMessageSidFeedbackJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Messages/${encodeURIComponent(toValue(params2))}/Feedback.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountMessageMessageFeedbackSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SigningKeys.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSigningKeysJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidSigningKeysJsonQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SigningKeys.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSigningKeysJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidSigningKeysJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSigningKeysJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SigningKeys.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountNewSigningKeySchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSigningKeysJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SigningKeys.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountNewSigningKeySchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Notifications/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidNotificationsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidNotificationsSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Notifications/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidNotificationsSidJson<
  TData = Static<typeof ApiV2010AccountNotificationInstanceSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountNotificationInstanceSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountNotificationInstanceSchema>,
          ReturnType<typeof get20100401AccountsAccountSidNotificationsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidNotificationsSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Notifications/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidNotificationsJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Notifications.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidNotificationsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidNotificationsJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Notifications.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidNotificationsJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidNotificationsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidNotificationsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Notifications.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/OutgoingCallerIds/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidOutgoingCallerIdsSidJson<
  TData = Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
          ReturnType<typeof get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/OutgoingCallerIds/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidOutgoingCallerIdsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/OutgoingCallerIds/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidOutgoingCallerIdsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/OutgoingCallerIds/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/OutgoingCallerIds.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidOutgoingCallerIdsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/OutgoingCallerIds.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountValidationRequestSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidOutgoingCallerIdsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/OutgoingCallerIds.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountValidationRequestSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Participants/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson<
  TData = Static<typeof ApiV2010AccountConferenceParticipantSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountConferenceParticipantSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountConferenceParticipantSchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Participants/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Participants/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountConferenceParticipantSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Participants/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Participants.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidConferencesConferenceSidParticipantsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Participants.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Conferences/${encodeURIComponent(toValue(params2))}/Participants.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountConferenceParticipantSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallPaymentsSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidPaymentsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Payments.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallPaymentsSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallPaymentsSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidPaymentsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Payments/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallPaymentsSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidQueuesSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidQueuesSidJsonQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidQueuesSidJson<
  TData = Static<typeof ApiV2010AccountQueueSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountQueueSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountQueueSchema>,
          ReturnType<typeof get20100401AccountsAccountSidQueuesSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() => get20100401AccountsAccountSidQueuesSidJsonQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountQueueSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidQueuesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountQueueSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidQueuesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidQueuesJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidQueuesJsonQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidQueuesJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidQueuesJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidQueuesJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountQueueSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidQueuesJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Queues.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountQueueSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidTranscriptionsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Transcriptions.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Transcriptions/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidRecordingsSidJsonQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidRecordingsSidJson<
  TData = Static<typeof ApiV2010AccountRecordingSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountRecordingSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountRecordingSchema>,
          ReturnType<typeof get20100401AccountsAccountSidRecordingsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidRecordingsSidJsonQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidRecordingsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidRecordingsJsonQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidRecordingsJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidRecordingsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidRecordingsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson<
  TData = Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
    toValue(params4),
  ] as const
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey(
        params,
        params2,
        params3,
        params4,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults/${encodeURIComponent(toValue(params3))}/Payloads/${encodeURIComponent(toValue(params4))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson<
  TData = Static<
    typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
  >,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<
            typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
          >,
          TError,
          TData,
          Static<
            typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema
          >,
          ReturnType<
            typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey(
          params,
          params2,
          params3,
          params4,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults/${encodeURIComponent(toValue(params3))}/Payloads/${encodeURIComponent(toValue(params4))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults/${encodeURIComponent(toValue(params3))}/Payloads/${encodeURIComponent(toValue(params4))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey(
        params,
        params2,
        params3,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults/${encodeURIComponent(toValue(params3))}/Payloads.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey(
          params,
          params2,
          params3,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults/${encodeURIComponent(toValue(params3))}/Payloads.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
    toValue(params4),
  ] as const
}

export function get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey(
        params,
        params2,
        params3,
        params4,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults/${encodeURIComponent(toValue(params3))}/Payloads/${encodeURIComponent(toValue(params4))}/Data.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson<
  TData = void,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  params4: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          void,
          TError,
          TData,
          void,
          ReturnType<
            typeof get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey(
          params,
          params2,
          params3,
          params4,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/AddOnResults/${encodeURIComponent(toValue(params3))}/Payloads/${encodeURIComponent(toValue(params4))}/Data.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/Transcriptions/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson<
  TData = Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/Transcriptions/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/Transcriptions/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/Transcriptions.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Recordings/${encodeURIComponent(toValue(params2))}/Transcriptions.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidSMSShortCodesSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SMS/ShortCodes/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSMSShortCodesSidJson<
  TData = Static<typeof ApiV2010AccountShortCodeSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountShortCodeSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountShortCodeSchema>,
          ReturnType<typeof get20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SMS/ShortCodes/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountShortCodeSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSMSShortCodesSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SMS/ShortCodes/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountShortCodeSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSMSShortCodesJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSMSShortCodesJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SMS/ShortCodes.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSMSShortCodesJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidSMSShortCodesJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSMSShortCodesJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SMS/ShortCodes.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidSigningKeysSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidSigningKeysSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSigningKeysSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SigningKeys/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSigningKeysSidJson<
  TData = Static<typeof ApiV2010AccountSigningKeySchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountSigningKeySchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountSigningKeySchema>,
          ReturnType<typeof get20100401AccountsAccountSidSigningKeysSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSigningKeysSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SigningKeys/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSigningKeySchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSigningKeysSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SigningKeys/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSigningKeySchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidSigningKeysSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SigningKeys/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/CredentialListMappings.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<
            typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
          >,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/CredentialListMappings/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
  >,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<
            typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
          >,
          TError,
          TData,
          Static<
            typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
          >,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/CredentialListMappings/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/CredentialListMappings/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/IpAccessControlListMappings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/IpAccessControlListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/IpAccessControlListMappings.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<
            typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
          >,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/IpAccessControlListMappings/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
  >,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<
            typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
          >,
          TError,
          TData,
          Static<
            typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
          >,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/IpAccessControlListMappings/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Calls/IpAccessControlListMappings/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Registrations/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Registrations/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Registrations/CredentialListMappings.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<
            typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
          >,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Registrations/CredentialListMappings/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson<
  TData = Static<
    typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
  >,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<
            typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
          >,
          TError,
          TData,
          Static<
            typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
          >,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Registrations/CredentialListMappings/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/Auth/Registrations/CredentialListMappings/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}/Credentials.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}/Credentials.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}/Credentials.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}/Credentials/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}/Credentials/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}/Credentials/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}/Credentials/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPCredentialListsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPCredentialListsJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPCredentialListsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidSIPCredentialListsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPCredentialListsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPCredentialListsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPCredentialListsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
          ReturnType<typeof get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPCredentialListsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidSIPCredentialListsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/CredentialLists/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/CredentialListMappings.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/CredentialListMappings/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/CredentialListMappings/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/CredentialListMappings/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => get20100401AccountsAccountSidSIPDomainsJsonQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidSIPDomainsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipDomainSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPDomainsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipDomainSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipDomainSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountSipSipDomainSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountSipSipDomainSchema>,
          ReturnType<typeof get20100401AccountsAccountSidSIPDomainsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipDomainSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPDomainsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipDomainSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidSIPDomainsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPIpAccessControlListsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPIpAccessControlListsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPIpAccessControlListsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
          ReturnType<typeof get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidSIPIpAccessControlListsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/IpAccessControlListMappings/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson<
  TData = Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/IpAccessControlListMappings/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/IpAccessControlListMappings/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/IpAccessControlListMappings.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/IpAccessControlListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/Domains/${encodeURIComponent(toValue(params2))}/IpAccessControlListMappings.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}/IpAddresses.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}/IpAddresses.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}/IpAddresses.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}/IpAddresses/${encodeURIComponent(toValue(params3))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson<
  TData = Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
          ReturnType<
            typeof get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey
          >
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}/IpAddresses/${encodeURIComponent(toValue(params3))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}/IpAddresses/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/SIP/IpAccessControlLists/${encodeURIComponent(toValue(params2))}/IpAddresses/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallSiprecSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidSiprecJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Siprec.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallSiprecSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallSiprecSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidSiprecSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Siprec/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallSiprecSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallStreamSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidStreamsJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Streams.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallStreamSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallStreamSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidStreamsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/Streams/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallStreamSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountTokenSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidTokensJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Tokens.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountTokenSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidTranscriptionsSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidTranscriptionsSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Transcriptions/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidTranscriptionsSidJson<
  TData = Static<typeof ApiV2010AccountTranscriptionSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountTranscriptionSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountTranscriptionSchema>,
          ReturnType<typeof get20100401AccountsAccountSidTranscriptionsSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidTranscriptionsSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Transcriptions/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidTranscriptionsSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Transcriptions/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Transcriptions.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidTranscriptionsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidTranscriptionsJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Transcriptions.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidTranscriptionsJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidTranscriptionsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidTranscriptionsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Transcriptions.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageRecordsJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageRecordsJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidUsageRecordsJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageRecordsJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/AllTime.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageRecordsAllTimeJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/AllTime.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsDailyJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/Daily.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageRecordsDailyJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/Daily.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/LastMonth.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageRecordsLastMonthJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/LastMonth.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/Monthly.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageRecordsMonthlyJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/Monthly.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/ThisMonth.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageRecordsThisMonthJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/ThisMonth.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsTodayJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/Today.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageRecordsTodayJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/Today.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/Yearly.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageRecordsYearlyJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/Yearly.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/Yesterday.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageRecordsYesterdayJson<
  TData = unknown,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Records/Yesterday.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function get20100401AccountsAccountSidUsageTriggersSidJsonQueryKey(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json',
    toValue(params),
    toValue(params2),
  ] as const
}

export function get20100401AccountsAccountSidUsageTriggersSidJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageTriggersSidJsonQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Triggers/${encodeURIComponent(toValue(params2))}.json`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageTriggersSidJson<
  TData = Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
          TError,
          TData,
          Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
          ReturnType<typeof get20100401AccountsAccountSidUsageTriggersSidJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageTriggersSidJsonQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Triggers/${encodeURIComponent(toValue(params2))}.json`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidUsageTriggersSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Triggers/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDelete20100401AccountsAccountSidUsageTriggersSidJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Triggers/${encodeURIComponent(toValue(params2))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json',
    toValue(params),
    keyArgs,
  ] as const
}

export function get20100401AccountsAccountSidUsageTriggersJsonQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() =>
      get20100401AccountsAccountSidUsageTriggersJsonQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Triggers.json${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function use20100401AccountsAccountSidUsageTriggersJson<TData = unknown, TError = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          unknown,
          TError,
          TData,
          unknown,
          ReturnType<typeof get20100401AccountsAccountSidUsageTriggersJsonQueryKey>
        >,
        { queryKey: unknown }
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
      ...queryOptions,
      queryKey: computed(() =>
        get20100401AccountsAccountSidUsageTriggersJsonQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Triggers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
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
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidUsageTriggersJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Usage/Triggers.json`,
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
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
  return mutationOptions<
    Static<typeof ApiV2010AccountCallUserDefinedMessageSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/UserDefinedMessages.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallUserDefinedMessageSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(params: MaybeRefOrGetter<string>, params2: MaybeRefOrGetter<string>) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/UserDefinedMessageSubscriptions.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Static<typeof ApiV2010AccountCallUserDefinedMessageSubscriptionSchema>,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
>(
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
) {
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
        `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(toValue(params))}/Calls/${encodeURIComponent(toValue(params2))}/UserDefinedMessageSubscriptions/${encodeURIComponent(toValue(params3))}.json`,
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
  params: MaybeRefOrGetter<string>,
  params2: MaybeRefOrGetter<string>,
  params3: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          void,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
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
