import { injectQuery, injectMutation, queryOptions, mutationOptions } from '@tanstack/angular-query'
import type { CreateQueryOptions, CreateMutationOptions } from '@tanstack/angular-query'
import type { Static } from 'elysia'
import type { WidgetResponseSchema } from '../components/schemas'
import { client, clientOrigin } from '../lib'

const ISO8601 =
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/u

const FORMAL_DATE =
  /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/u

const SHORTENED_DATE =
  /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/u

function reviveDate(_key: string, value: unknown) {
  if (typeof value !== 'string') return value
  const text = value.replace(/"/gu, '')
  if (!ISO8601.test(text) && !FORMAL_DATE.test(text) && !SHORTENED_DATE.test(text)) return value
  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? value : date
}

async function readResponse(res: Response, as: 'json' | 'text' | 'bytes' = 'json') {
  if (res.ok && as === 'bytes') return res.arrayBuffer()
  const text = await res.text()
  if (res.ok) {
    if (as === 'text') return text
    return text === '' ? undefined : JSON.parse(text, reviveDate)
  }
  let error: unknown
  try {
    error = JSON.parse(text, reviveDate)
  } catch {
    error = Object.assign(new Error(`${res.status} ${res.statusText}`.trim()), {
      status: res.status,
      value: text,
    })
  }
  throw error
}

function toSearch(query: Record<string, unknown> | undefined) {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(query ?? {})) {
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item === undefined || item === null) continue
      search.append(
        key,
        item instanceof Date
          ? item.toISOString()
          : typeof item === 'object'
            ? JSON.stringify(item)
            : String(item),
      )
    }
  }
  return search
}

export function getApplicationsKey() {
  return ['applications'] as const
}

export function getChannelsKey() {
  return ['channels'] as const
}

export function getGatewayKey() {
  return ['gateway'] as const
}

export function getGuildsKey() {
  return ['guilds'] as const
}

export function getInteractionsKey() {
  return ['interactions'] as const
}

export function getInvitesKey() {
  return ['invites'] as const
}

export function getLobbiesKey() {
  return ['lobbies'] as const
}

export function getOauth2Key() {
  return ['oauth2'] as const
}

export function getPartnerSdkKey() {
  return ['partner-sdk'] as const
}

export function getSkusKey() {
  return ['skus'] as const
}

export function getSoundboardDefaultSoundsKey() {
  return ['soundboard-default-sounds'] as const
}

export function getStageInstancesKey() {
  return ['stage-instances'] as const
}

export function getStickerPacksKey() {
  return ['sticker-packs'] as const
}

export function getStickersKey() {
  return ['stickers'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getVoiceKey() {
  return ['voice'] as const
}

export function getWebhooksKey() {
  return ['webhooks'] as const
}

export function getApplicationsMeQueryKey() {
  return ['applications', '/applications/@me'] as const
}

export function getApplicationsMeQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client.applications)['@me']['get']>>['error'], null>,
>(options?: Parameters<(typeof client.applications)['@me']['get']>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsMeQueryKey>
  >({
    queryKey: getApplicationsMeQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.applications['@me'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsMe<
  TData = Extract<
    Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client.applications)['@me']['get']>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsMeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.applications)['@me']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getApplicationsMeQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getPatchApplicationsMeMutationKey() {
  return ['applications', '/applications/@me', 'PATCH'] as const
}

export function getPatchApplicationsMeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client.applications)['@me']['patch']>[0]
      options?: Parameters<(typeof client.applications)['@me']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchApplicationsMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications['@me'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchApplicationsMe<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<(typeof client.applications)['@me']['patch']>[0]
          options?: Parameters<(typeof client.applications)['@me']['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchApplicationsMeMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdQueryKey(
  params: Parameters<typeof client.applications>[0],
) {
  return ['applications', '/applications/{application_id}', params] as const
}

export function getApplicationsApplicationIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: Parameters<ReturnType<typeof client.applications>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdQueryKey>
  >({
    queryKey: getApplicationsApplicationIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.applications>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPatchApplicationsApplicationIdMutationKey() {
  return ['applications', '/applications/{application_id}', 'PATCH'] as const
}

export function getPatchApplicationsApplicationIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.applications>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['patch']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchApplicationsApplicationIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications(params).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchApplicationsApplicationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.applications>['patch']>[0]
          options?: Parameters<ReturnType<typeof client.applications>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchApplicationsApplicationIdMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['activity-instances']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/activity-instances/{instance_id}',
    params,
    params2,
  ] as const
}

export function getApplicationsApplicationIdActivityInstancesInstanceIdQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['activity-instances']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdActivityInstancesInstanceIdQueryKey>
  >({
    queryKey: getApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        ['activity-instances'](params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdActivityInstancesInstanceId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['activity-instances']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdActivityInstancesInstanceIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdActivityInstancesInstanceIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPostApplicationsApplicationIdAttachmentMutationKey() {
  return ['applications', '/applications/{application_id}/attachment', 'POST'] as const
}

export function getPostApplicationsApplicationIdAttachmentMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.applications>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdAttachmentMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications(params).attachment.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostApplicationsApplicationIdAttachment<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[0]
          options?: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostApplicationsApplicationIdAttachmentMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdCommandsQueryKey(
  params: Parameters<typeof client.applications>[0],
  options?: Parameters<ReturnType<typeof client.applications>['commands']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['applications', '/applications/{application_id}/commands', params, keyArgs] as const
}

export function getApplicationsApplicationIdCommandsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: Parameters<ReturnType<typeof client.applications>['commands']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdCommandsQueryKey>
  >({
    queryKey: getApplicationsApplicationIdCommandsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .commands.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdCommands<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdCommandsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.applications>['commands']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdCommandsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPutApplicationsApplicationIdCommandsMutationKey() {
  return ['applications', '/applications/{application_id}/commands', 'PUT'] as const
}

export function getPutApplicationsApplicationIdCommandsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.applications>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['commands']['put']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['commands']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutApplicationsApplicationIdCommandsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications(params).commands.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutApplicationsApplicationIdCommands<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.applications>['commands']['put']>[0]
          options?: Parameters<ReturnType<typeof client.applications>['commands']['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutApplicationsApplicationIdCommandsMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostApplicationsApplicationIdCommandsMutationKey() {
  return ['applications', '/applications/{application_id}/commands', 'POST'] as const
}

export function getPostApplicationsApplicationIdCommandsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.applications>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['commands']['post']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['commands']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdCommandsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications(params).commands.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostApplicationsApplicationIdCommands<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.applications>['commands']['post']>[0]
          options?: Parameters<ReturnType<typeof client.applications>['commands']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostApplicationsApplicationIdCommandsMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdCommandsCommandIdQueryKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['commands']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/commands/{command_id}',
    params,
    params2,
  ] as const
}

export function getApplicationsApplicationIdCommandsCommandIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['commands']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdCommandsCommandIdQueryKey>
  >({
    queryKey: getApplicationsApplicationIdCommandsCommandIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .commands(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdCommandsCommandId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['commands']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdCommandsCommandIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdCommandsCommandIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteApplicationsApplicationIdCommandsCommandIdMutationKey() {
  return ['applications', '/applications/{application_id}/commands/{command_id}', 'DELETE'] as const
}

export function getDeleteApplicationsApplicationIdCommandsCommandIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['commands']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteApplicationsApplicationIdCommandsCommandIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        .commands(params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteApplicationsApplicationIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['commands']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteApplicationsApplicationIdCommandsCommandIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchApplicationsApplicationIdCommandsCommandIdMutationKey() {
  return ['applications', '/applications/{application_id}/commands/{command_id}', 'PATCH'] as const
}

export function getPatchApplicationsApplicationIdCommandsCommandIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['commands']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['commands']>['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchApplicationsApplicationIdCommandsCommandIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        .commands(params2)
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchApplicationsApplicationIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['commands']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.applications>['commands']>['patch']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['commands']>['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchApplicationsApplicationIdCommandsCommandIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdEmojisQueryKey(
  params: Parameters<typeof client.applications>[0],
) {
  return ['applications', '/applications/{application_id}/emojis', params] as const
}

export function getApplicationsApplicationIdEmojisQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: Parameters<ReturnType<typeof client.applications>['emojis']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdEmojisQueryKey>
  >({
    queryKey: getApplicationsApplicationIdEmojisQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .emojis.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdEmojis<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdEmojisQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.applications>['emojis']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdEmojisQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostApplicationsApplicationIdEmojisMutationKey() {
  return ['applications', '/applications/{application_id}/emojis', 'POST'] as const
}

export function getPostApplicationsApplicationIdEmojisMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.applications>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdEmojisMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications(params).emojis.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostApplicationsApplicationIdEmojis<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[0]
          options?: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostApplicationsApplicationIdEmojisMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdEmojisEmojiIdQueryKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['emojis']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/emojis/{emoji_id}',
    params,
    params2,
  ] as const
}

export function getApplicationsApplicationIdEmojisEmojiIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['emojis']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdEmojisEmojiIdQueryKey>
  >({
    queryKey: getApplicationsApplicationIdEmojisEmojiIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .emojis(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdEmojisEmojiId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['emojis']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdEmojisEmojiIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdEmojisEmojiIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteApplicationsApplicationIdEmojisEmojiIdMutationKey() {
  return ['applications', '/applications/{application_id}/emojis/{emoji_id}', 'DELETE'] as const
}

export function getDeleteApplicationsApplicationIdEmojisEmojiIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['emojis']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteApplicationsApplicationIdEmojisEmojiIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        .emojis(params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteApplicationsApplicationIdEmojisEmojiId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['emojis']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteApplicationsApplicationIdEmojisEmojiIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchApplicationsApplicationIdEmojisEmojiIdMutationKey() {
  return ['applications', '/applications/{application_id}/emojis/{emoji_id}', 'PATCH'] as const
}

export function getPatchApplicationsApplicationIdEmojisEmojiIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['emojis']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchApplicationsApplicationIdEmojisEmojiIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications(params).emojis(params2).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchApplicationsApplicationIdEmojisEmojiId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['emojis']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchApplicationsApplicationIdEmojisEmojiIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdEntitlementsQueryKey(
  params: Parameters<typeof client.applications>[0],
  options?: Parameters<ReturnType<typeof client.applications>['entitlements']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['applications', '/applications/{application_id}/entitlements', params, keyArgs] as const
}

export function getApplicationsApplicationIdEntitlementsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: Parameters<ReturnType<typeof client.applications>['entitlements']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdEntitlementsQueryKey>
  >({
    queryKey: getApplicationsApplicationIdEntitlementsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .entitlements.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdEntitlements<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdEntitlementsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.applications>['entitlements']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdEntitlementsQueryOptions<TData, TError>(
        params(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPostApplicationsApplicationIdEntitlementsMutationKey() {
  return ['applications', '/applications/{application_id}/entitlements', 'POST'] as const
}

export function getPostApplicationsApplicationIdEntitlementsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.applications>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdEntitlementsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications(params).entitlements.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostApplicationsApplicationIdEntitlements<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[0]
          options?: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostApplicationsApplicationIdEntitlementsMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/entitlements/{entitlement_id}',
    params,
    params2,
  ] as const
}

export function getApplicationsApplicationIdEntitlementsEntitlementIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdEntitlementsEntitlementIdQueryKey>
  >({
    queryKey: getApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .entitlements(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdEntitlementsEntitlementId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdEntitlementsEntitlementIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdEntitlementsEntitlementIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/entitlements/{entitlement_id}',
    'DELETE',
  ] as const
}

export function getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        .entitlements(params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteApplicationsApplicationIdEntitlementsEntitlementId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/entitlements/{entitlement_id}/consume',
    'POST',
  ] as const
}

export function getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        .entitlements(params2)
        .consume.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostApplicationsApplicationIdEntitlementsEntitlementIdConsume<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands',
    params,
    params2,
    keyArgs,
  ] as const
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdGuildsGuildIdCommandsQueryKey>
  >({
    queryKey: getApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(params, params2, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .guilds(params2)
        .commands.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdGuildsGuildIdCommands<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdGuildsGuildIdCommandsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdGuildsGuildIdCommandsQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands',
    'PUT',
  ] as const
}

export function getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        .guilds(params2)
        .commands.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutApplicationsApplicationIdGuildsGuildIdCommands<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands',
    'POST',
  ] as const
}

export function getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        .guilds(params2)
        .commands.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostApplicationsApplicationIdGuildsGuildIdCommands<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/permissions',
    params,
    params2,
  ] as const
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.applications>['guilds']
        >['commands']['permissions']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.applications>['guilds']
        >['commands']['permissions']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['permissions']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<typeof client.applications>['guilds']
          >['commands']['permissions']['get']
        >
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey>
  >({
    queryKey: getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .guilds(params2)
        .commands.permissions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdGuildsGuildIdCommandsPermissions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.applications>['guilds']
        >['commands']['permissions']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.applications>['guilds']
        >['commands']['permissions']['get']
      >
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<typeof client.applications>['guilds']
              >['commands']['permissions']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['permissions']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    params,
    params2,
    params3,
  ] as const
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['get']
        >
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey>
  >({
    queryKey: getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .guilds(params2)
        .commands(params3)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdGuildsGuildIdCommandsCommandId<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
      >
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
  >[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryOptions<TData, TError>(
        params(),
        params2(),
        params3(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    'DELETE',
  ] as const
}

export function getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['delete']
      >[0]
      options?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        .guilds(params2)
        .commands(params3)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
  >[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['delete']
          >[0]
          options?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    'PATCH',
  ] as const
}

export function getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['patch']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['patch']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['patch']
      >[0]
      options?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        .guilds(params2)
        .commands(params3)
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['patch']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
  >[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['patch']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['patch']
          >[0]
          options?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    params,
    params2,
    params3,
  ] as const
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
  options?: Parameters<
    ReturnType<
      ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
    >['permissions']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['permissions']['get']
        >
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey>
  >({
    queryKey: getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(
      params,
      params2,
      params3,
    ),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        .guilds(params2)
        .commands(params3)
        .permissions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['get']
      >
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
  >[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['permissions']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<
          typeof getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
      >['permissions']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryOptions<
        TData,
        TError
      >(params(), params2(), params3(), clientOptions),
      ...query,
    }
  })
}

export function getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    'PUT',
  ] as const
}

export function getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['permissions']['put']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['put']
      >[0]
      options?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey:
      getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        .guilds(params2)
        .commands(params3)
        .permissions.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  params2: () => Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
  >[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['permissions']['put']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['permissions']['put']
          >[0]
          options?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['permissions']['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getApplicationsApplicationIdRoleConnectionsMetadataQueryKey(
  params: Parameters<typeof client.applications>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/role-connections/metadata',
    params,
  ] as const
}

export function getApplicationsApplicationIdRoleConnectionsMetadataQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: Parameters<
    ReturnType<typeof client.applications>['role-connections']['metadata']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getApplicationsApplicationIdRoleConnectionsMetadataQueryKey>
  >({
    queryKey: getApplicationsApplicationIdRoleConnectionsMetadataQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .applications(params)
        ['role-connections'].metadata.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectApplicationsApplicationIdRoleConnectionsMetadata<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<typeof client.applications>['role-connections']['metadata']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getApplicationsApplicationIdRoleConnectionsMetadataQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.applications>['role-connections']['metadata']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getApplicationsApplicationIdRoleConnectionsMetadataQueryOptions<TData, TError>(
        params(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPutApplicationsApplicationIdRoleConnectionsMetadataMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/role-connections/metadata',
    'PUT',
  ] as const
}

export function getPutApplicationsApplicationIdRoleConnectionsMetadataMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.applications>[0]) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['put']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<typeof client.applications>['role-connections']['metadata']['put']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.applications>['role-connections']['metadata']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutApplicationsApplicationIdRoleConnectionsMetadataMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(params)
        ['role-connections'].metadata.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutApplicationsApplicationIdRoleConnectionsMetadata<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.applications>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<typeof client.applications>['role-connections']['metadata']['put']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<typeof client.applications>['role-connections']['metadata']['put']
          >[0]
          options?: Parameters<
            ReturnType<typeof client.applications>['role-connections']['metadata']['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutApplicationsApplicationIdRoleConnectionsMetadataMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdQueryKey(params: Parameters<typeof client.channels>[0]) {
  return ['channels', '/channels/{channel_id}', params] as const
}

export function getChannelsChannelIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdQueryKey>
  >({
    queryKey: getChannelsChannelIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getChannelsChannelIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  })
}

export function getDeleteChannelsChannelIdMutationKey() {
  return ['channels', '/channels/{channel_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.channels>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.channels>['delete']>[0]
          options?: Parameters<ReturnType<typeof client.channels>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteChannelsChannelIdMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchChannelsChannelIdMutationKey() {
  return ['channels', '/channels/{channel_id}', 'PATCH'] as const
}

export function getPatchChannelsChannelIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['patch']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchChannelsChannelIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchChannelsChannelId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.channels>['patch']>[0]
          options?: Parameters<ReturnType<typeof client.channels>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchChannelsChannelIdMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostChannelsChannelIdFollowersMutationKey() {
  return ['channels', '/channels/{channel_id}/followers', 'POST'] as const
}

export function getPostChannelsChannelIdFollowersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['followers']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['followers']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdFollowersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).followers.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.channels>['followers']['post']>[0]
          options?: Parameters<ReturnType<typeof client.channels>['followers']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdFollowersMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdInvitesQueryKey(params: Parameters<typeof client.channels>[0]) {
  return ['channels', '/channels/{channel_id}/invites', params] as const
}

export function getChannelsChannelIdInvitesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['invites']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdInvitesQueryKey>
  >({
    queryKey: getChannelsChannelIdInvitesQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .invites.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdInvites<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdInvitesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['invites']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdInvitesQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostChannelsChannelIdInvitesMutationKey() {
  return ['channels', '/channels/{channel_id}/invites', 'POST'] as const
}

export function getPostChannelsChannelIdInvitesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['invites']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['invites']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdInvitesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).invites.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdInvites<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.channels>['invites']['post']>[0]
          options?: Parameters<ReturnType<typeof client.channels>['invites']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdInvitesMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdMessagesQueryKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['messages']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/messages', params, keyArgs] as const
}

export function getChannelsChannelIdMessagesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['messages']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdMessagesQueryKey>
  >({
    queryKey: getChannelsChannelIdMessagesQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .messages.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdMessages<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdMessagesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['messages']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdMessagesQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostChannelsChannelIdMessagesMutationKey() {
  return ['channels', '/channels/{channel_id}/messages', 'POST'] as const
}

export function getPostChannelsChannelIdMessagesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['messages']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['messages']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdMessagesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).messages.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.channels>['messages']['post']>[0]
          options?: Parameters<ReturnType<typeof client.channels>['messages']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdMessagesMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostChannelsChannelIdMessagesBulkDeleteMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/bulk-delete', 'POST'] as const
}

export function getPostChannelsChannelIdMessagesBulkDeleteMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdMessagesBulkDeleteMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .messages['bulk-delete'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdMessagesBulkDelete<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>[0]
          options?: Parameters<
            ReturnType<typeof client.channels>['messages']['bulk-delete']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdMessagesBulkDeleteMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdMessagesPinsQueryKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['messages']['pins']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/messages/pins', params, keyArgs] as const
}

export function getChannelsChannelIdMessagesPinsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['messages']['pins']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdMessagesPinsQueryKey>
  >({
    queryKey: getChannelsChannelIdMessagesPinsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .messages.pins.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdMessagesPins<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdMessagesPinsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['messages']['pins']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdMessagesPinsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPutChannelsChannelIdMessagesPinsMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/pins/{message_id}', 'PUT'] as const
}

export function getPutChannelsChannelIdMessagesPinsMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']['pins']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdMessagesPinsMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .messages.pins(params2)
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutChannelsChannelIdMessagesPinsMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']['pins']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutChannelsChannelIdMessagesPinsMessageIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteChannelsChannelIdMessagesPinsMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/pins/{message_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdMessagesPinsMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']['pins']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesPinsMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .messages.pins(params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdMessagesPinsMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']['pins']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteChannelsChannelIdMessagesPinsMessageIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdMessagesMessageIdQueryKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
) {
  return ['channels', '/channels/{channel_id}/messages/{message_id}', params, params2] as const
}

export function getChannelsChannelIdMessagesMessageIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdMessagesMessageIdQueryKey>
  >({
    queryKey: getChannelsChannelIdMessagesMessageIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .messages(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdMessagesMessageId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdMessagesMessageIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdMessagesMessageIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteChannelsChannelIdMessagesMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdMessagesMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).messages(params2).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteChannelsChannelIdMessagesMessageIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchChannelsChannelIdMessagesMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}', 'PATCH'] as const
}

export function getPatchChannelsChannelIdMessagesMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchChannelsChannelIdMessagesMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).messages(params2).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchChannelsChannelIdMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']>['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchChannelsChannelIdMessagesMessageIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostChannelsChannelIdMessagesMessageIdCrosspostMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}/crosspost', 'POST'] as const
}

export function getPostChannelsChannelIdMessagesMessageIdCrosspostMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdMessagesMessageIdCrosspostMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .messages(params2)
        .crosspost.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdMessagesMessageIdCrosspost<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdMessagesMessageIdCrosspostMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}/reactions', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .messages(params2)
        .reactions.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdMessagesMessageIdReactions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
        >
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey>
  >({
    queryKey: getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(
      params,
      params2,
      params3,
      options,
    ),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .messages(params2)
        .reactions(params3)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdMessagesMessageIdReactionsEmojiName<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
      >
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
  >[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
              >['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryOptions<TData, TError>(
        params(),
        params2(),
        params3(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    'DELETE',
  ] as const
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['delete']
      >[0]
      options?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .messages(params2)
        .reactions(params3)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
  >[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
              >['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['delete']
          >[0]
          options?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
    'PUT',
  ] as const
}

export function getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['@me']['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['@me']['put']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['@me']['put']
      >[0]
      options?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['@me']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .messages(params2)
        .reactions(params3)
        ['@me'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['@me']['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
  >[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
              >['@me']['put']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['@me']['put']
          >[0]
          options?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['@me']['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
    'DELETE',
  ] as const
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['@me']['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['@me']['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['@me']['delete']
      >[0]
      options?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['@me']['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .messages(params2)
        .reactions(params3)
        ['@me'].delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['@me']['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
  >[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
              >['@me']['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['@me']['delete']
          >[0]
          options?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['@me']['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}',
    'DELETE',
  ] as const
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
        >['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
  params4: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
  >[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
          >['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
        >['delete']
      >[0]
      options?: Parameters<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
        >['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .messages(params2)
        .reactions(params3)(params4)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
        >['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
  >[0],
  params4: () => Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
  >[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
              >['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
            >['delete']
          >[0]
          options?: Parameters<
            ReturnType<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
            >['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2(), params3(), params4())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostChannelsChannelIdMessagesMessageIdThreadsMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}/threads', 'POST'] as const
}

export function getPostChannelsChannelIdMessagesMessageIdThreadsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdMessagesMessageIdThreadsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .messages(params2)
        .threads.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdMessagesMessageIdThreads<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdMessagesMessageIdThreadsMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdPermissionsMemberUserIdQueryKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']['member']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/permissions/member/{user_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function getChannelsChannelIdPermissionsMemberUserIdQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']['member']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdPermissionsMemberUserIdQueryKey>
  >({
    queryKey: getChannelsChannelIdPermissionsMemberUserIdQueryKey(params, params2, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .permissions.member(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdPermissionsMemberUserId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['permissions']['member']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdPermissionsMemberUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdPermissionsMemberUserIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getChannelsChannelIdPermissionsRoleRoleIdQueryKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']['role']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/permissions/role/{role_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function getChannelsChannelIdPermissionsRoleRoleIdQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']['role']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdPermissionsRoleRoleIdQueryKey>
  >({
    queryKey: getChannelsChannelIdPermissionsRoleRoleIdQueryKey(params, params2, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .permissions.role(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdPermissionsRoleRoleId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['permissions']['role']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdPermissionsRoleRoleIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdPermissionsRoleRoleIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPutChannelsChannelIdPermissionsOverwriteIdMutationKey() {
  return ['channels', '/channels/{channel_id}/permissions/{overwrite_id}', 'PUT'] as const
}

export function getPutChannelsChannelIdPermissionsOverwriteIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdPermissionsOverwriteIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).permissions(params2).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutChannelsChannelIdPermissionsOverwriteId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['permissions']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['permissions']>['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutChannelsChannelIdPermissionsOverwriteIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteChannelsChannelIdPermissionsOverwriteIdMutationKey() {
  return ['channels', '/channels/{channel_id}/permissions/{overwrite_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdPermissionsOverwriteIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdPermissionsOverwriteIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .permissions(params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdPermissionsOverwriteId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['permissions']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteChannelsChannelIdPermissionsOverwriteIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdPinsQueryKey(params: Parameters<typeof client.channels>[0]) {
  return ['channels', '/channels/{channel_id}/pins', params] as const
}

export function getChannelsChannelIdPinsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['pins']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdPinsQueryKey>
  >({
    queryKey: getChannelsChannelIdPinsQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .pins.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdPins<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdPinsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['pins']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdPinsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPutChannelsChannelIdPinsMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/pins/{message_id}', 'PUT'] as const
}

export function getPutChannelsChannelIdPinsMessageIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['pins']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdPinsMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).pins(params2).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutChannelsChannelIdPinsMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['pins']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutChannelsChannelIdPinsMessageIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteChannelsChannelIdPinsMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/pins/{message_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdPinsMessageIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['pins']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdPinsMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).pins(params2).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdPinsMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['pins']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteChannelsChannelIdPinsMessageIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['polls']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/polls/{message_id}/answers/{answer_id}',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['polls']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
        >
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey>
  >({
    queryKey: getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(
      params,
      params2,
      params3,
      options,
    ),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .polls(params2)
        .answers(params3)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdPollsMessageIdAnswersAnswerId<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
      >
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['polls']>[0],
  params3: () => Parameters<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryOptions<TData, TError>(
        params(),
        params2(),
        params3(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPostChannelsChannelIdPollsMessageIdExpireMutationKey() {
  return ['channels', '/channels/{channel_id}/polls/{message_id}/expire', 'POST'] as const
}

export function getPostChannelsChannelIdPollsMessageIdExpireMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['polls']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdPollsMessageIdExpireMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .polls(params2)
        .expire.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdPollsMessageIdExpire<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['polls']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdPollsMessageIdExpireMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPutChannelsChannelIdRecipientsUserIdMutationKey() {
  return ['channels', '/channels/{channel_id}/recipients/{user_id}', 'PUT'] as const
}

export function getPutChannelsChannelIdRecipientsUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['recipients']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdRecipientsUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).recipients(params2).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutChannelsChannelIdRecipientsUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['recipients']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['recipients']>['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutChannelsChannelIdRecipientsUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteChannelsChannelIdRecipientsUserIdMutationKey() {
  return ['channels', '/channels/{channel_id}/recipients/{user_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdRecipientsUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['recipients']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdRecipientsUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        .recipients(params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdRecipientsUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['recipients']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteChannelsChannelIdRecipientsUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostChannelsChannelIdSendSoundboardSoundMutationKey() {
  return ['channels', '/channels/{channel_id}/send-soundboard-sound', 'POST'] as const
}

export function getPostChannelsChannelIdSendSoundboardSoundMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdSendSoundboardSoundMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        ['send-soundboard-sound'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdSendSoundboardSound<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[0]
          options?: Parameters<
            ReturnType<typeof client.channels>['send-soundboard-sound']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdSendSoundboardSoundMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdThreadMembersQueryKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['thread-members']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/thread-members', params, keyArgs] as const
}

export function getChannelsChannelIdThreadMembersQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['thread-members']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdThreadMembersQueryKey>
  >({
    queryKey: getChannelsChannelIdThreadMembersQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        ['thread-members'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdThreadMembers<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdThreadMembersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['thread-members']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdThreadMembersQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPutChannelsChannelIdThreadMembersMeMutationKey() {
  return ['channels', '/channels/{channel_id}/thread-members/@me', 'PUT'] as const
}

export function getPutChannelsChannelIdThreadMembersMeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdThreadMembersMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        ['thread-members']['@me'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutChannelsChannelIdThreadMembersMe<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[0]
          options?: Parameters<
            ReturnType<typeof client.channels>['thread-members']['@me']['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutChannelsChannelIdThreadMembersMeMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteChannelsChannelIdThreadMembersMeMutationKey() {
  return ['channels', '/channels/{channel_id}/thread-members/@me', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdThreadMembersMeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdThreadMembersMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        ['thread-members']['@me'].delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdThreadMembersMe<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<typeof client.channels>['thread-members']['@me']['delete']
          >[0]
          options?: Parameters<
            ReturnType<typeof client.channels>['thread-members']['@me']['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteChannelsChannelIdThreadMembersMeMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdThreadMembersUserIdQueryKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/thread-members/{user_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function getChannelsChannelIdThreadMembersUserIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdThreadMembersUserIdQueryKey>
  >({
    queryKey: getChannelsChannelIdThreadMembersUserIdQueryKey(params, params2, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        ['thread-members'](params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdThreadMembersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdThreadMembersUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdThreadMembersUserIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPutChannelsChannelIdThreadMembersUserIdMutationKey() {
  return ['channels', '/channels/{channel_id}/thread-members/{user_id}', 'PUT'] as const
}

export function getPutChannelsChannelIdThreadMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdThreadMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        ['thread-members'](params2)
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutChannelsChannelIdThreadMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutChannelsChannelIdThreadMembersUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteChannelsChannelIdThreadMembersUserIdMutationKey() {
  return ['channels', '/channels/{channel_id}/thread-members/{user_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdThreadMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdThreadMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(params)
        ['thread-members'](params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteChannelsChannelIdThreadMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  params2: () => Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteChannelsChannelIdThreadMembersUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostChannelsChannelIdThreadsMutationKey() {
  return ['channels', '/channels/{channel_id}/threads', 'POST'] as const
}

export function getPostChannelsChannelIdThreadsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['threads']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['threads']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdThreadsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).threads.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdThreads<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.channels>['threads']['post']>[0]
          options?: Parameters<ReturnType<typeof client.channels>['threads']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdThreadsMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdThreadsArchivedPrivateQueryKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<
    ReturnType<typeof client.channels>['threads']['archived']['private']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/threads/archived/private', params, keyArgs] as const
}

export function getChannelsChannelIdThreadsArchivedPrivateQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<
    ReturnType<typeof client.channels>['threads']['archived']['private']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdThreadsArchivedPrivateQueryKey>
  >({
    queryKey: getChannelsChannelIdThreadsArchivedPrivateQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .threads.archived.private.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdThreadsArchivedPrivate<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdThreadsArchivedPrivateQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.channels>['threads']['archived']['private']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdThreadsArchivedPrivateQueryOptions<TData, TError>(
        params(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getChannelsChannelIdThreadsArchivedPublicQueryKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<
    ReturnType<typeof client.channels>['threads']['archived']['public']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/threads/archived/public', params, keyArgs] as const
}

export function getChannelsChannelIdThreadsArchivedPublicQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<
    ReturnType<typeof client.channels>['threads']['archived']['public']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdThreadsArchivedPublicQueryKey>
  >({
    queryKey: getChannelsChannelIdThreadsArchivedPublicQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .threads.archived.public.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdThreadsArchivedPublic<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdThreadsArchivedPublicQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.channels>['threads']['archived']['public']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdThreadsArchivedPublicQueryOptions<TData, TError>(
        params(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getChannelsChannelIdThreadsSearchQueryKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['threads']['search']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/threads/search', params, keyArgs] as const
}

export function getChannelsChannelIdThreadsSearchQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['threads']['search']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdThreadsSearchQueryKey>
  >({
    queryKey: getChannelsChannelIdThreadsSearchQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .threads.search.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdThreadsSearch<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdThreadsSearchQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['threads']['search']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdThreadsSearchQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostChannelsChannelIdTypingMutationKey() {
  return ['channels', '/channels/{channel_id}/typing', 'POST'] as const
}

export function getPostChannelsChannelIdTypingMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdTypingMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).typing.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdTyping<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[0]
          options?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdTypingMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<
    ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/users/@me/threads/archived/private',
    params,
    keyArgs,
  ] as const
}

export function getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<
    ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            typeof client.channels
          >['users']['@me']['threads']['archived']['private']['get']
        >
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey>
  >({
    queryKey: getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .users['@me'].threads.archived.private.get({
          ...options,
          fetch: { ...options?.fetch, signal },
        })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdUsersMeThreadsArchivedPrivate<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
      >
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                typeof client.channels
              >['users']['@me']['threads']['archived']['private']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryOptions<TData, TError>(
        params(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPutChannelsChannelIdVoiceStatusMutationKey() {
  return ['channels', '/channels/{channel_id}/voice-status', 'PUT'] as const
}

export function getPutChannelsChannelIdVoiceStatusMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdVoiceStatusMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params)['voice-status'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutChannelsChannelIdVoiceStatus<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[0]
          options?: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutChannelsChannelIdVoiceStatusMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getChannelsChannelIdWebhooksQueryKey(
  params: Parameters<typeof client.channels>[0],
) {
  return ['channels', '/channels/{channel_id}/webhooks', params] as const
}

export function getChannelsChannelIdWebhooksQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['webhooks']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getChannelsChannelIdWebhooksQueryKey>
  >({
    queryKey: getChannelsChannelIdWebhooksQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .channels(params)
        .webhooks.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectChannelsChannelIdWebhooks<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getChannelsChannelIdWebhooksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['webhooks']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getChannelsChannelIdWebhooksQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostChannelsChannelIdWebhooksMutationKey() {
  return ['channels', '/channels/{channel_id}/webhooks', 'POST'] as const
}

export function getPostChannelsChannelIdWebhooksMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.channels>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdWebhooksMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(params).webhooks.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostChannelsChannelIdWebhooks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.channels>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[0]
          options?: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostChannelsChannelIdWebhooksMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGatewayQueryKey() {
  return ['gateway', '/gateway'] as const
}

export function getGatewayQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.gateway.get>>['error'], null>,
>(options?: Parameters<typeof client.gateway.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getGatewayQueryKey>
  >({
    queryKey: getGatewayQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.gateway.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectGateway<
  TData = Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.gateway.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getGatewayQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.gateway.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGatewayQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getGatewayBotQueryKey() {
  return ['gateway', '/gateway/bot'] as const
}

export function getGatewayBotQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.gateway.bot.get>>['error'], null>,
>(options?: Parameters<typeof client.gateway.bot.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getGatewayBotQueryKey>
  >({
    queryKey: getGatewayBotQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.gateway.bot.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectGatewayBot<
  TData = Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.gateway.bot.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getGatewayBotQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.gateway.bot.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGatewayBotQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getGuildsTemplatesCodeQueryKey(
  params: Parameters<typeof client.guilds.templates>[0],
) {
  return ['guilds', '/guilds/templates/{code}', params] as const
}

export function getGuildsTemplatesCodeQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds.templates>[0],
  options?: Parameters<ReturnType<typeof client.guilds.templates>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsTemplatesCodeQueryKey>
  >({
    queryKey: getGuildsTemplatesCodeQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.guilds
        .templates(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsTemplatesCode<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds.templates>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsTemplatesCodeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds.templates>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsTemplatesCodeQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}', params, keyArgs] as const
}

export function getGuildsGuildIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['get']>[0],
) {
  return queryOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdQueryKey>
  >({
    queryKey: getGuildsGuildIdQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGuildsGuildIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  })
}

export function getPatchGuildsGuildIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['patch']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdMutationOptions<TError, TOnMutateResult>(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdAuditLogsQueryKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['audit-logs']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/audit-logs', params, keyArgs] as const
}

export function getGuildsGuildIdAuditLogsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['audit-logs']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdAuditLogsQueryKey>
  >({
    queryKey: getGuildsGuildIdAuditLogsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['audit-logs'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdAuditLogs<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdAuditLogsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['audit-logs']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdAuditLogsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdAutoModerationRulesQueryKey(
  params: Parameters<typeof client.guilds>[0],
) {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules', params] as const
}

export function getGuildsGuildIdAutoModerationRulesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdAutoModerationRulesQueryKey>
  >({
    queryKey: getGuildsGuildIdAutoModerationRulesQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['auto-moderation'].rules.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdAutoModerationRules<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdAutoModerationRulesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdAutoModerationRulesQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostGuildsGuildIdAutoModerationRulesMutationKey() {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules', 'POST'] as const
}

export function getPostGuildsGuildIdAutoModerationRulesMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdAutoModerationRulesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['auto-moderation'].rules.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdAutoModerationRules<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>[0]
          options?: Parameters<
            ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostGuildsGuildIdAutoModerationRulesMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdAutoModerationRulesRuleIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules/{rule_id}', params, params2] as const
}

export function getGuildsGuildIdAutoModerationRulesRuleIdQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdAutoModerationRulesRuleIdQueryKey>
  >({
    queryKey: getGuildsGuildIdAutoModerationRulesRuleIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['auto-moderation'].rules(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdAutoModerationRulesRuleId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdAutoModerationRulesRuleIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdAutoModerationRulesRuleIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules/{rule_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['auto-moderation'].rules(params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdAutoModerationRulesRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules/{rule_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['auto-moderation'].rules(params2)
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdAutoModerationRulesRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdBansQueryKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['bans']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/bans', params, keyArgs] as const
}

export function getGuildsGuildIdBansQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['bans']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdBansQueryKey>
  >({
    queryKey: getGuildsGuildIdBansQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .bans.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdBans<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdBansQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['bans']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGuildsGuildIdBansQueryOptions<TData, TError>(params(), clientOptions), ...query }
  })
}

export function getGuildsGuildIdBansUserIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['bans']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/bans/{user_id}', params, params2] as const
}

export function getGuildsGuildIdBansUserIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['bans']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdBansUserIdQueryKey>
  >({
    queryKey: getGuildsGuildIdBansUserIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .bans(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdBansUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['bans']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdBansUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdBansUserIdQueryOptions<TData, TError>(params(), params2(), clientOptions),
      ...query,
    }
  })
}

export function getPutGuildsGuildIdBansUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/bans/{user_id}', 'PUT'] as const
}

export function getPutGuildsGuildIdBansUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['bans']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdBansUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).bans(params2).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutGuildsGuildIdBansUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['bans']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutGuildsGuildIdBansUserIdMutationOptions<TError, TOnMutateResult>(
      params(),
      params2(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteGuildsGuildIdBansUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/bans/{user_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdBansUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['bans']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdBansUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).bans(params2).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdBansUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['bans']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteGuildsGuildIdBansUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostGuildsGuildIdBulkBanMutationKey() {
  return ['guilds', '/guilds/{guild_id}/bulk-ban', 'POST'] as const
}

export function getPostGuildsGuildIdBulkBanMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdBulkBanMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params)['bulk-ban'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdBulkBan<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostGuildsGuildIdBulkBanMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdChannelsQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/channels', params] as const
}

export function getGuildsGuildIdChannelsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['channels']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdChannelsQueryKey>
  >({
    queryKey: getGuildsGuildIdChannelsQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .channels.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdChannels<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdChannelsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['channels']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdChannelsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostGuildsGuildIdChannelsMutationKey() {
  return ['guilds', '/guilds/{guild_id}/channels', 'POST'] as const
}

export function getPostGuildsGuildIdChannelsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdChannelsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).channels.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdChannels<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostGuildsGuildIdChannelsMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdChannelsMutationKey() {
  return ['guilds', '/guilds/{guild_id}/channels', 'PATCH'] as const
}

export function getPatchGuildsGuildIdChannelsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdChannelsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).channels.patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdChannels<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdChannelsMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdEmojisQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/emojis', params] as const
}

export function getGuildsGuildIdEmojisQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['emojis']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdEmojisQueryKey>
  >({
    queryKey: getGuildsGuildIdEmojisQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .emojis.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdEmojis<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdEmojisQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['emojis']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdEmojisQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostGuildsGuildIdEmojisMutationKey() {
  return ['guilds', '/guilds/{guild_id}/emojis', 'POST'] as const
}

export function getPostGuildsGuildIdEmojisMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdEmojisMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).emojis.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdEmojis<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostGuildsGuildIdEmojisMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdEmojisEmojiIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/emojis/{emoji_id}', params, params2] as const
}

export function getGuildsGuildIdEmojisEmojiIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdEmojisEmojiIdQueryKey>
  >({
    queryKey: getGuildsGuildIdEmojisEmojiIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .emojis(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdEmojisEmojiId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdEmojisEmojiIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdEmojisEmojiIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteGuildsGuildIdEmojisEmojiIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/emojis/{emoji_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdEmojisEmojiIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdEmojisEmojiIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).emojis(params2).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdEmojisEmojiId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteGuildsGuildIdEmojisEmojiIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdEmojisEmojiIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/emojis/{emoji_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdEmojisEmojiIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdEmojisEmojiIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).emojis(params2).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdEmojisEmojiId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdEmojisEmojiIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPutGuildsGuildIdIncidentActionsMutationKey() {
  return ['guilds', '/guilds/{guild_id}/incident-actions', 'PUT'] as const
}

export function getPutGuildsGuildIdIncidentActionsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdIncidentActionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params)['incident-actions'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutGuildsGuildIdIncidentActions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutGuildsGuildIdIncidentActionsMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdIntegrationsQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/integrations', params] as const
}

export function getGuildsGuildIdIntegrationsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['integrations']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdIntegrationsQueryKey>
  >({
    queryKey: getGuildsGuildIdIntegrationsQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .integrations.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdIntegrations<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdIntegrationsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['integrations']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdIntegrationsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/integrations/{integration_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['integrations']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        .integrations(params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdIntegrationsIntegrationId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['integrations']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdInvitesQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/invites', params] as const
}

export function getGuildsGuildIdInvitesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['invites']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdInvitesQueryKey>
  >({
    queryKey: getGuildsGuildIdInvitesQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .invites.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdInvites<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdInvitesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['invites']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdInvitesQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdMembersQueryKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['members']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/members', params, keyArgs] as const
}

export function getGuildsGuildIdMembersQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['members']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdMembersQueryKey>
  >({
    queryKey: getGuildsGuildIdMembersQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .members.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdMembers<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdMembersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['members']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdMembersQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPatchGuildsGuildIdMembersMeMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/@me', 'PATCH'] as const
}

export function getPatchGuildsGuildIdMembersMeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdMembersMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).members['@me'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdMembersMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdMembersMeMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdMembersSearchQueryKey(
  params: Parameters<typeof client.guilds>[0],
  options: Parameters<ReturnType<typeof client.guilds>['members']['search']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/members/search', params, keyArgs] as const
}

export function getGuildsGuildIdMembersSearchQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options: Parameters<ReturnType<typeof client.guilds>['members']['search']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdMembersSearchQueryKey>
  >({
    queryKey: getGuildsGuildIdMembersSearchQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .members.search.get({ ...options, fetch: { ...options.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdMembersSearch<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdMembersSearchQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<ReturnType<typeof client.guilds>['members']['search']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return {
      ...getGuildsGuildIdMembersSearchQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdMembersUserIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', params, params2] as const
}

export function getGuildsGuildIdMembersUserIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdMembersUserIdQueryKey>
  >({
    queryKey: getGuildsGuildIdMembersUserIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .members(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdMembersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['members']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdMembersUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdMembersUserIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPutGuildsGuildIdMembersUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', 'PUT'] as const
}

export function getPutGuildsGuildIdMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).members(params2).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['members']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutGuildsGuildIdMembersUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteGuildsGuildIdMembersUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).members(params2).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['members']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteGuildsGuildIdMembersUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdMembersUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).members(params2).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['members']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdMembersUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}/roles/{role_id}', 'PUT'] as const
}

export function getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        .members(params2)
        .roles(params3)
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutGuildsGuildIdMembersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['members']>[0],
  params3: () => Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}/roles/{role_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        .members(params2)
        .roles(params3)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdMembersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['members']>[0],
  params3: () => Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdMessagesSearchQueryKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['messages']['search']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/messages/search', params, keyArgs] as const
}

export function getGuildsGuildIdMessagesSearchQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['messages']['search']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdMessagesSearchQueryKey>
  >({
    queryKey: getGuildsGuildIdMessagesSearchQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .messages.search.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdMessagesSearch<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdMessagesSearchQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['messages']['search']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdMessagesSearchQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdNewMemberWelcomeQueryKey(
  params: Parameters<typeof client.guilds>[0],
) {
  return ['guilds', '/guilds/{guild_id}/new-member-welcome', params] as const
}

export function getGuildsGuildIdNewMemberWelcomeQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['new-member-welcome']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdNewMemberWelcomeQueryKey>
  >({
    queryKey: getGuildsGuildIdNewMemberWelcomeQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['new-member-welcome'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdNewMemberWelcome<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdNewMemberWelcomeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['new-member-welcome']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdNewMemberWelcomeQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdOnboardingQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/onboarding', params] as const
}

export function getGuildsGuildIdOnboardingQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdOnboardingQueryKey>
  >({
    queryKey: getGuildsGuildIdOnboardingQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .onboarding.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdOnboarding<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdOnboardingQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdOnboardingQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPutGuildsGuildIdOnboardingMutationKey() {
  return ['guilds', '/guilds/{guild_id}/onboarding', 'PUT'] as const
}

export function getPutGuildsGuildIdOnboardingMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdOnboardingMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).onboarding.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutGuildsGuildIdOnboarding<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutGuildsGuildIdOnboardingMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdPermissionsMemberUserIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['permissions']['member']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/permissions/member/{user_id}', params, params2] as const
}

export function getGuildsGuildIdPermissionsMemberUserIdQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['permissions']['member']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdPermissionsMemberUserIdQueryKey>
  >({
    queryKey: getGuildsGuildIdPermissionsMemberUserIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .permissions.member(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdPermissionsMemberUserId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['permissions']['member']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdPermissionsMemberUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdPermissionsMemberUserIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getGuildsGuildIdPermissionsRoleRoleIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['permissions']['role']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/permissions/role/{role_id}', params, params2] as const
}

export function getGuildsGuildIdPermissionsRoleRoleIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['permissions']['role']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdPermissionsRoleRoleIdQueryKey>
  >({
    queryKey: getGuildsGuildIdPermissionsRoleRoleIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .permissions.role(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdPermissionsRoleRoleId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['permissions']['role']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdPermissionsRoleRoleIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdPermissionsRoleRoleIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getGuildsGuildIdPreviewQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/preview', params] as const
}

export function getGuildsGuildIdPreviewQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['preview']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdPreviewQueryKey>
  >({
    queryKey: getGuildsGuildIdPreviewQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .preview.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdPreview<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdPreviewQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['preview']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdPreviewQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdPruneQueryKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['prune']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/prune', params, keyArgs] as const
}

export function getGuildsGuildIdPruneQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['prune']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdPruneQueryKey>
  >({
    queryKey: getGuildsGuildIdPruneQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .prune.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdPrune<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdPruneQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['prune']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdPruneQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostGuildsGuildIdPruneMutationKey() {
  return ['guilds', '/guilds/{guild_id}/prune', 'POST'] as const
}

export function getPostGuildsGuildIdPruneMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdPruneMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).prune.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdPrune<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostGuildsGuildIdPruneMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdRegionsQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/regions', params] as const
}

export function getGuildsGuildIdRegionsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['regions']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdRegionsQueryKey>
  >({
    queryKey: getGuildsGuildIdRegionsQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .regions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdRegions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdRegionsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['regions']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdRegionsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdRequestsQueryKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['requests']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/requests', params, keyArgs] as const
}

export function getGuildsGuildIdRequestsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['requests']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdRequestsQueryKey>
  >({
    queryKey: getGuildsGuildIdRequestsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .requests.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdRequests<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdRequestsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['requests']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdRequestsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPatchGuildsGuildIdRequestsRequestIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/requests/{request_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdRequestsRequestIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['requests']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdRequestsRequestIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).requests(params2).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdRequestsRequestId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['requests']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdRequestsRequestIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdRolesQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/roles', params] as const
}

export function getGuildsGuildIdRolesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['roles']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdRolesQueryKey>
  >({
    queryKey: getGuildsGuildIdRolesQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .roles.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdRoles<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdRolesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['roles']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdRolesQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostGuildsGuildIdRolesMutationKey() {
  return ['guilds', '/guilds/{guild_id}/roles', 'POST'] as const
}

export function getPostGuildsGuildIdRolesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdRolesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).roles.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostGuildsGuildIdRolesMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdRolesMutationKey() {
  return ['guilds', '/guilds/{guild_id}/roles', 'PATCH'] as const
}

export function getPatchGuildsGuildIdRolesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdRolesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).roles.patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdRolesMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdRolesMemberCountsQueryKey(
  params: Parameters<typeof client.guilds>[0],
) {
  return ['guilds', '/guilds/{guild_id}/roles/member-counts', params] as const
}

export function getGuildsGuildIdRolesMemberCountsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdRolesMemberCountsQueryKey>
  >({
    queryKey: getGuildsGuildIdRolesMemberCountsQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .roles['member-counts'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdRolesMemberCounts<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdRolesMemberCountsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdRolesMemberCountsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdRolesRoleIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['roles']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/roles/{role_id}', params, params2] as const
}

export function getGuildsGuildIdRolesRoleIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['roles']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdRolesRoleIdQueryKey>
  >({
    queryKey: getGuildsGuildIdRolesRoleIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .roles(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdRolesRoleId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['roles']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdRolesRoleIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdRolesRoleIdQueryOptions<TData, TError>(params(), params2(), clientOptions),
      ...query,
    }
  })
}

export function getDeleteGuildsGuildIdRolesRoleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/roles/{role_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['roles']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).roles(params2).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['roles']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteGuildsGuildIdRolesRoleIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdRolesRoleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/roles/{role_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['roles']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).roles(params2).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['roles']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdRolesRoleIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdScheduledEventsQueryKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/scheduled-events', params, keyArgs] as const
}

export function getGuildsGuildIdScheduledEventsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdScheduledEventsQueryKey>
  >({
    queryKey: getGuildsGuildIdScheduledEventsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['scheduled-events'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdScheduledEvents<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdScheduledEventsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdScheduledEventsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostGuildsGuildIdScheduledEventsMutationKey() {
  return ['guilds', '/guilds/{guild_id}/scheduled-events', 'POST'] as const
}

export function getPostGuildsGuildIdScheduledEventsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdScheduledEventsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params)['scheduled-events'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdScheduledEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostGuildsGuildIdScheduledEventsMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey>
  >({
    queryKey: getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['scheduled-events'](params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdScheduledEventsGuildScheduledEventId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    'DELETE',
  ] as const
}

export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['scheduled-events'](params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    'PATCH',
  ] as const
}

export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['scheduled-events'](params2)
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdScheduledEventsGuildScheduledEventId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsMutationKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions',
    'POST',
  ] as const
}

export function getPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['scheduled-events'](params2)
        .exceptions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
    'DELETE',
  ] as const
}

export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
        >['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
  >[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
          >['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
        >['delete']
      >[0]
      options?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
        >['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey:
      getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['scheduled-events'](params2)
        .exceptions(params3)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
        >['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
  >[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
              >['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
            >['delete']
          >[0]
          options?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
            >['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
    'PATCH',
  ] as const
}

export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
        >['patch']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
  >[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
          >['patch']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
        >['patch']
      >[0]
      options?: Parameters<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
        >['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey:
      getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['scheduled-events'](params2)
        .exceptions(params3)
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
        >['patch']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
  >[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
              >['patch']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
            >['patch']
          >[0]
          options?: Parameters<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
            >['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users',
    params,
    params2,
    keyArgs,
  ] as const
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey>
  >({
    queryKey: getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['scheduled-events'](params2)
        .users.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/counts',
    params,
    params2,
    keyArgs,
  ] as const
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
        >
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryKey>
  >({
    queryKey: getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryKey(
      params,
      params2,
      options,
    ),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['scheduled-events'](params2)
        .users.counts.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
      >
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<typeof client.guilds>['scheduled-events']
              >['users']['counts']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/{guild_scheduled_event_exception_id}/users',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>
          >['users']['get']
        >
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<
      typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryKey
    >
  >({
    queryKey:
      getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryKey(
        params,
        params2,
        params3,
        options,
      ),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['scheduled-events'](params2)(params3)
        .users.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
      >
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: () => Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>
              >['users']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<
          typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryKey
        >
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryOptions<
        TData,
        TError
      >(params(), params2(), params3(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdSoundboardSoundsQueryKey(
  params: Parameters<typeof client.guilds>[0],
) {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds', params] as const
}

export function getGuildsGuildIdSoundboardSoundsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdSoundboardSoundsQueryKey>
  >({
    queryKey: getGuildsGuildIdSoundboardSoundsQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['soundboard-sounds'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdSoundboardSounds<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdSoundboardSoundsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdSoundboardSoundsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostGuildsGuildIdSoundboardSoundsMutationKey() {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds', 'POST'] as const
}

export function getPostGuildsGuildIdSoundboardSoundsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdSoundboardSoundsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params)['soundboard-sounds'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdSoundboardSounds<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostGuildsGuildIdSoundboardSoundsMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdSoundboardSoundsSoundIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds/{sound_id}', params, params2] as const
}

export function getGuildsGuildIdSoundboardSoundsSoundIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdSoundboardSoundsSoundIdQueryKey>
  >({
    queryKey: getGuildsGuildIdSoundboardSoundsSoundIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['soundboard-sounds'](params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdSoundboardSoundsSoundId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdSoundboardSoundsSoundIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdSoundboardSoundsSoundIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds/{sound_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['soundboard-sounds'](params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdSoundboardSoundsSoundId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds/{sound_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['soundboard-sounds'](params2)
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdSoundboardSoundsSoundId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdStickersQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/stickers', params] as const
}

export function getGuildsGuildIdStickersQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['stickers']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdStickersQueryKey>
  >({
    queryKey: getGuildsGuildIdStickersQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .stickers.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdStickers<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdStickersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['stickers']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdStickersQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostGuildsGuildIdStickersMutationKey() {
  return ['guilds', '/guilds/{guild_id}/stickers', 'POST'] as const
}

export function getPostGuildsGuildIdStickersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdStickersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).stickers.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdStickers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostGuildsGuildIdStickersMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdStickersStickerIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/stickers/{sticker_id}', params, params2] as const
}

export function getGuildsGuildIdStickersStickerIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdStickersStickerIdQueryKey>
  >({
    queryKey: getGuildsGuildIdStickersStickerIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .stickers(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdStickersStickerId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdStickersStickerIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdStickersStickerIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteGuildsGuildIdStickersStickerIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/stickers/{sticker_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdStickersStickerIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdStickersStickerIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).stickers(params2).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdStickersStickerId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteGuildsGuildIdStickersStickerIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdStickersStickerIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/stickers/{sticker_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdStickersStickerIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdStickersStickerIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).stickers(params2).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdStickersStickerId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdStickersStickerIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdTemplatesQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/templates', params] as const
}

export function getGuildsGuildIdTemplatesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['templates']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdTemplatesQueryKey>
  >({
    queryKey: getGuildsGuildIdTemplatesQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .templates.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdTemplates<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdTemplatesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['templates']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdTemplatesQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostGuildsGuildIdTemplatesMutationKey() {
  return ['guilds', '/guilds/{guild_id}/templates', 'POST'] as const
}

export function getPostGuildsGuildIdTemplatesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdTemplatesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).templates.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostGuildsGuildIdTemplates<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostGuildsGuildIdTemplatesMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPutGuildsGuildIdTemplatesCodeMutationKey() {
  return ['guilds', '/guilds/{guild_id}/templates/{code}', 'PUT'] as const
}

export function getPutGuildsGuildIdTemplatesCodeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['templates']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdTemplatesCodeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).templates(params2).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutGuildsGuildIdTemplatesCode<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['templates']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutGuildsGuildIdTemplatesCodeMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteGuildsGuildIdTemplatesCodeMutationKey() {
  return ['guilds', '/guilds/{guild_id}/templates/{code}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdTemplatesCodeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['templates']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdTemplatesCodeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).templates(params2).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteGuildsGuildIdTemplatesCode<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['templates']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteGuildsGuildIdTemplatesCodeMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchGuildsGuildIdTemplatesCodeMutationKey() {
  return ['guilds', '/guilds/{guild_id}/templates/{code}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdTemplatesCodeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['templates']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdTemplatesCodeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).templates(params2).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdTemplatesCode<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['templates']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdTemplatesCodeMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdThreadsActiveQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/threads/active', params] as const
}

export function getGuildsGuildIdThreadsActiveQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['threads']['active']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdThreadsActiveQueryKey>
  >({
    queryKey: getGuildsGuildIdThreadsActiveQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .threads.active.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdThreadsActive<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdThreadsActiveQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['threads']['active']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdThreadsActiveQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdVanityUrlQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/vanity-url', params] as const
}

export function getGuildsGuildIdVanityUrlQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['vanity-url']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdVanityUrlQueryKey>
  >({
    queryKey: getGuildsGuildIdVanityUrlQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['vanity-url'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdVanityUrl<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdVanityUrlQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['vanity-url']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdVanityUrlQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdVoiceStatesMeQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/voice-states/@me', params] as const
}

export function getGuildsGuildIdVoiceStatesMeQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdVoiceStatesMeQueryKey>
  >({
    queryKey: getGuildsGuildIdVoiceStatesMeQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['voice-states']['@me'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdVoiceStatesMe<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdVoiceStatesMeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdVoiceStatesMeQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPatchGuildsGuildIdVoiceStatesMeMutationKey() {
  return ['guilds', '/guilds/{guild_id}/voice-states/@me', 'PATCH'] as const
}

export function getPatchGuildsGuildIdVoiceStatesMeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdVoiceStatesMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['voice-states']['@me'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdVoiceStatesMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdVoiceStatesMeMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdVoiceStatesUserIdQueryKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['voice-states']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/voice-states/{user_id}', params, params2] as const
}

export function getGuildsGuildIdVoiceStatesUserIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['voice-states']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdVoiceStatesUserIdQueryKey>
  >({
    queryKey: getGuildsGuildIdVoiceStatesUserIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['voice-states'](params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdVoiceStatesUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['voice-states']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdVoiceStatesUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdVoiceStatesUserIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPatchGuildsGuildIdVoiceStatesUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/voice-states/{user_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdVoiceStatesUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['voice-states']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdVoiceStatesUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(params)
        ['voice-states'](params2)
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdVoiceStatesUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  params2: () => Parameters<ReturnType<typeof client.guilds>['voice-states']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdVoiceStatesUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdWebhooksQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/webhooks', params] as const
}

export function getGuildsGuildIdWebhooksQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['webhooks']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdWebhooksQueryKey>
  >({
    queryKey: getGuildsGuildIdWebhooksQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .webhooks.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdWebhooks<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdWebhooksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['webhooks']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdWebhooksQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdWelcomeScreenQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/welcome-screen', params] as const
}

export function getGuildsGuildIdWelcomeScreenQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdWelcomeScreenQueryKey>
  >({
    queryKey: getGuildsGuildIdWelcomeScreenQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        ['welcome-screen'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdWelcomeScreen<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdWelcomeScreenQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdWelcomeScreenQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPatchGuildsGuildIdWelcomeScreenMutationKey() {
  return ['guilds', '/guilds/{guild_id}/welcome-screen', 'PATCH'] as const
}

export function getPatchGuildsGuildIdWelcomeScreenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdWelcomeScreenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params)['welcome-screen'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdWelcomeScreen<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdWelcomeScreenMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdWidgetQueryKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/widget', params] as const
}

export function getGuildsGuildIdWidgetQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['widget']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdWidgetQueryKey>
  >({
    queryKey: getGuildsGuildIdWidgetQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .guilds(params)
        .widget.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectGuildsGuildIdWidget<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdWidgetQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['widget']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdWidgetQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPatchGuildsGuildIdWidgetMutationKey() {
  return ['guilds', '/guilds/{guild_id}/widget', 'PATCH'] as const
}

export function getPatchGuildsGuildIdWidgetMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.guilds>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdWidgetMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(params).widget.patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchGuildsGuildIdWidget<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.guilds>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[0]
          options?: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchGuildsGuildIdWidgetMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getGuildsGuildIdWidgetJsonQueryKey(params: string) {
  return ['guilds', '/guilds/{guild_id}/widget.json', params] as const
}

export function getGuildsGuildIdWidgetJsonQueryOptions<
  TData = Static<typeof WidgetResponseSchema>,
  TError = unknown,
>(params: string, options?: { headers?: Record<string, string> }) {
  return queryOptions<
    Static<typeof WidgetResponseSchema>,
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdWidgetJsonQueryKey>
  >({
    queryKey: getGuildsGuildIdWidgetJsonQueryKey(params),
    queryFn: async ({ signal }) => {
      const res = await fetch(`${clientOrigin}/guilds/${encodeURIComponent(params)}/widget.json`, {
        headers: options?.headers,
        signal,
      })
      return readResponse(res)
    },
  })
}

export function injectGuildsGuildIdWidgetJson<
  TData = Static<typeof WidgetResponseSchema>,
  TError = unknown,
>(
  params: () => string,
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Static<typeof WidgetResponseSchema>,
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdWidgetJsonQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdWidgetJsonQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getGuildsGuildIdWidgetPngQueryKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/widget.png', params, keyArgs] as const
}

export function getGuildsGuildIdWidgetPngQueryOptions<TData = ArrayBuffer, TError = unknown>(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return queryOptions<
    ArrayBuffer,
    TError,
    TData,
    ReturnType<typeof getGuildsGuildIdWidgetPngQueryKey>
  >({
    queryKey: getGuildsGuildIdWidgetPngQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const search = toSearch(options?.query)
      const res = await fetch(
        `${clientOrigin}/guilds/${encodeURIComponent(params)}/widget.png${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      return readResponse(res, 'bytes')
    },
  })
}

export function injectGuildsGuildIdWidgetPng<TData = ArrayBuffer, TError = unknown>(
  params: () => string,
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        ArrayBuffer,
        TError,
        TData,
        ReturnType<typeof getGuildsGuildIdWidgetPngQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getGuildsGuildIdWidgetPngQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostInteractionsInteractionIdInteractionTokenCallbackMutationKey() {
  return [
    'interactions',
    '/interactions/{interaction_id}/{interaction_token}/callback',
    'POST',
  ] as const
}

export function getPostInteractionsInteractionIdInteractionTokenCallbackMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.interactions>[0],
  params2: Parameters<ReturnType<typeof client.interactions>>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.interactions>>['callback']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostInteractionsInteractionIdInteractionTokenCallbackMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .interactions(params)(params2)
        .callback.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostInteractionsInteractionIdInteractionTokenCallback<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.interactions>[0],
  params2: () => Parameters<ReturnType<typeof client.interactions>>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.interactions>>['callback']['post']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.interactions>>['callback']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getPostInteractionsInteractionIdInteractionTokenCallbackMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getInvitesCodeQueryKey(
  params: Parameters<typeof client.invites>[0],
  options?: Parameters<ReturnType<typeof client.invites>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['invites', '/invites/{code}', params, keyArgs] as const
}

export function getInvitesCodeQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.invites>[0],
  options?: Parameters<ReturnType<typeof client.invites>['get']>[0],
) {
  return queryOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getInvitesCodeQueryKey>
  >({
    queryKey: getInvitesCodeQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .invites(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectInvitesCode<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.invites>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getInvitesCodeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.invites>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getInvitesCodeQueryOptions<TData, TError>(params(), clientOptions), ...query }
  })
}

export function getDeleteInvitesCodeMutationKey() {
  return ['invites', '/invites/{code}', 'DELETE'] as const
}

export function getDeleteInvitesCodeMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.invites>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.invites>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.invites>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteInvitesCodeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.invites(params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteInvitesCode<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.invites>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.invites>['delete']>[0]
          options?: Parameters<ReturnType<typeof client.invites>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteInvitesCodeMutationOptions<TError, TOnMutateResult>(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getInvitesCodeTargetUsersQueryKey(params: Parameters<typeof client.invites>[0]) {
  return ['invites', '/invites/{code}/target-users', params] as const
}

export function getInvitesCodeTargetUsersQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  options?: Parameters<ReturnType<typeof client.invites>['target-users']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getInvitesCodeTargetUsersQueryKey>
  >({
    queryKey: getInvitesCodeTargetUsersQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .invites(params)
        ['target-users'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectInvitesCodeTargetUsers<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.invites>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getInvitesCodeTargetUsersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.invites>['target-users']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getInvitesCodeTargetUsersQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPutInvitesCodeTargetUsersMutationKey() {
  return ['invites', '/invites/{code}/target-users', 'PUT'] as const
}

export function getPutInvitesCodeTargetUsersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.invites>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[0]
      options?: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutInvitesCodeTargetUsersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.invites(params)['target-users'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutInvitesCodeTargetUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.invites>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[0]
          options?: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutInvitesCodeTargetUsersMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostInvitesCodeTargetUsersBulkAddMutationKey() {
  return ['invites', '/invites/{code}/target-users/bulk-add', 'POST'] as const
}

export function getPostInvitesCodeTargetUsersBulkAddMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.invites>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>[0]
      options?: Parameters<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostInvitesCodeTargetUsersBulkAddMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .invites(params)
        ['target-users']['bulk-add'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostInvitesCodeTargetUsersBulkAdd<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.invites>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>[0]
          options?: Parameters<
            ReturnType<typeof client.invites>['target-users']['bulk-add']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostInvitesCodeTargetUsersBulkAddMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostInvitesCodeTargetUsersBulkDeleteMutationKey() {
  return ['invites', '/invites/{code}/target-users/bulk-delete', 'POST'] as const
}

export function getPostInvitesCodeTargetUsersBulkDeleteMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.invites>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>[0]
      options?: Parameters<
        ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostInvitesCodeTargetUsersBulkDeleteMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .invites(params)
        ['target-users']['bulk-delete'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostInvitesCodeTargetUsersBulkDelete<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.invites>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
          >[0]
          options?: Parameters<
            ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostInvitesCodeTargetUsersBulkDeleteMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getInvitesCodeTargetUsersJobStatusQueryKey(
  params: Parameters<typeof client.invites>[0],
) {
  return ['invites', '/invites/{code}/target-users/job-status', params] as const
}

export function getInvitesCodeTargetUsersJobStatusQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  options?: Parameters<ReturnType<typeof client.invites>['target-users']['job-status']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getInvitesCodeTargetUsersJobStatusQueryKey>
  >({
    queryKey: getInvitesCodeTargetUsersJobStatusQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .invites(params)
        ['target-users']['job-status'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectInvitesCodeTargetUsersJobStatus<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.invites>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getInvitesCodeTargetUsersJobStatusQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.invites>['target-users']['job-status']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getInvitesCodeTargetUsersJobStatusQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPutInvitesCodeTargetUsersUserIdMutationKey() {
  return ['invites', '/invites/{code}/target-users/{user_id}', 'PUT'] as const
}

export function getPutInvitesCodeTargetUsersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.invites>[0],
  params2: Parameters<ReturnType<typeof client.invites>['target-users']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutInvitesCodeTargetUsersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .invites(params)
        ['target-users'](params2)
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutInvitesCodeTargetUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.invites>[0],
  params2: () => Parameters<ReturnType<typeof client.invites>['target-users']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.invites>['target-users']>['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutInvitesCodeTargetUsersUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteInvitesCodeTargetUsersUserIdMutationKey() {
  return ['invites', '/invites/{code}/target-users/{user_id}', 'DELETE'] as const
}

export function getDeleteInvitesCodeTargetUsersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.invites>[0],
  params2: Parameters<ReturnType<typeof client.invites>['target-users']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteInvitesCodeTargetUsersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .invites(params)
        ['target-users'](params2)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteInvitesCodeTargetUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.invites>[0],
  params2: () => Parameters<ReturnType<typeof client.invites>['target-users']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteInvitesCodeTargetUsersUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPutLobbiesMutationKey() {
  return ['lobbies', '/lobbies', 'PUT'] as const
}

export function getPutLobbiesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.lobbies.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.lobbies.put>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.lobbies.put>[0]
      options?: Parameters<typeof client.lobbies.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutLobbiesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutLobbies<
  TError = Exclude<Awaited<ReturnType<typeof client.lobbies.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.lobbies.put>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.lobbies.put>[0]
          options?: Parameters<typeof client.lobbies.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutLobbiesMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostLobbiesMutationKey() {
  return ['lobbies', '/lobbies', 'POST'] as const
}

export function getPostLobbiesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.lobbies.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.lobbies.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.lobbies.post>[0]
      options?: Parameters<typeof client.lobbies.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLobbiesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostLobbies<
  TError = Exclude<Awaited<ReturnType<typeof client.lobbies.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.lobbies.post>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.lobbies.post>[0]
          options?: Parameters<typeof client.lobbies.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostLobbiesMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getLobbiesLobbyIdQueryKey(params: Parameters<typeof client.lobbies>[0]) {
  return ['lobbies', '/lobbies/{lobby_id}', params] as const
}

export function getLobbiesLobbyIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: Parameters<ReturnType<typeof client.lobbies>['get']>[0],
) {
  return queryOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getLobbiesLobbyIdQueryKey>
  >({
    queryKey: getLobbiesLobbyIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .lobbies(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectLobbiesLobbyId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getLobbiesLobbyIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.lobbies>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getLobbiesLobbyIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  })
}

export function getDeleteLobbiesLobbyIdMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}', 'DELETE'] as const
}

export function getDeleteLobbiesLobbyIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.lobbies>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.lobbies>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteLobbiesLobbyIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteLobbiesLobbyId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.lobbies>['delete']>[0]
          options?: Parameters<ReturnType<typeof client.lobbies>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteLobbiesLobbyIdMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchLobbiesLobbyIdMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}', 'PATCH'] as const
}

export function getPatchLobbiesLobbyIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.lobbies>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.lobbies>['patch']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchLobbiesLobbyIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(params).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchLobbiesLobbyId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.lobbies>['patch']>[0]
          options?: Parameters<ReturnType<typeof client.lobbies>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchLobbiesLobbyIdMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchLobbiesLobbyIdChannelLinkingMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/channel-linking', 'PATCH'] as const
}

export function getPatchLobbiesLobbyIdChannelLinkingMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.lobbies>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchLobbiesLobbyIdChannelLinkingMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(params)['channel-linking'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchLobbiesLobbyIdChannelLinking<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[0]
          options?: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchLobbiesLobbyIdChannelLinkingMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteLobbiesLobbyIdMembersMeMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/@me', 'DELETE'] as const
}

export function getDeleteLobbiesLobbyIdMembersMeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.lobbies>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteLobbiesLobbyIdMembersMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(params).members['@me'].delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteLobbiesLobbyIdMembersMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[0]
          options?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteLobbiesLobbyIdMembersMeMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostLobbiesLobbyIdMembersMeInvitesMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/@me/invites', 'POST'] as const
}

export function getPostLobbiesLobbyIdMembersMeInvitesMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.lobbies>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>[0]
      options?: Parameters<
        ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLobbiesLobbyIdMembersMeInvitesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .lobbies(params)
        .members['@me'].invites.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostLobbiesLobbyIdMembersMeInvites<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']
          >[0]
          options?: Parameters<
            ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostLobbiesLobbyIdMembersMeInvitesMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostLobbiesLobbyIdMembersBulkMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/bulk', 'POST'] as const
}

export function getPostLobbiesLobbyIdMembersBulkMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.lobbies>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLobbiesLobbyIdMembersBulkMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(params).members.bulk.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostLobbiesLobbyIdMembersBulk<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[0]
          options?: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostLobbiesLobbyIdMembersBulkMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPutLobbiesLobbyIdMembersUserIdMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/{user_id}', 'PUT'] as const
}

export function getPutLobbiesLobbyIdMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.lobbies>[0],
  params2: Parameters<ReturnType<typeof client.lobbies>['members']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutLobbiesLobbyIdMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(params).members(params2).put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutLobbiesLobbyIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  params2: () => Parameters<ReturnType<typeof client.lobbies>['members']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutLobbiesLobbyIdMembersUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteLobbiesLobbyIdMembersUserIdMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/{user_id}', 'DELETE'] as const
}

export function getDeleteLobbiesLobbyIdMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.lobbies>[0],
  params2: Parameters<ReturnType<typeof client.lobbies>['members']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteLobbiesLobbyIdMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(params).members(params2).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteLobbiesLobbyIdMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  params2: () => Parameters<ReturnType<typeof client.lobbies>['members']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteLobbiesLobbyIdMembersUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostLobbiesLobbyIdMembersUserIdInvitesMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/{user_id}/invites', 'POST'] as const
}

export function getPostLobbiesLobbyIdMembersUserIdInvitesMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.lobbies>[0],
  params2: Parameters<ReturnType<typeof client.lobbies>['members']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLobbiesLobbyIdMembersUserIdInvitesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .lobbies(params)
        .members(params2)
        .invites.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostLobbiesLobbyIdMembersUserIdInvites<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  params2: () => Parameters<ReturnType<typeof client.lobbies>['members']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostLobbiesLobbyIdMembersUserIdInvitesMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getLobbiesLobbyIdMessagesQueryKey(
  params: Parameters<typeof client.lobbies>[0],
  options?: Parameters<ReturnType<typeof client.lobbies>['messages']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['lobbies', '/lobbies/{lobby_id}/messages', params, keyArgs] as const
}

export function getLobbiesLobbyIdMessagesQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: Parameters<ReturnType<typeof client.lobbies>['messages']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getLobbiesLobbyIdMessagesQueryKey>
  >({
    queryKey: getLobbiesLobbyIdMessagesQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .lobbies(params)
        .messages.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectLobbiesLobbyIdMessages<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getLobbiesLobbyIdMessagesQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.lobbies>['messages']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getLobbiesLobbyIdMessagesQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getPostLobbiesLobbyIdMessagesMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/messages', 'POST'] as const
}

export function getPostLobbiesLobbyIdMessagesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.lobbies>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLobbiesLobbyIdMessagesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(params).messages.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostLobbiesLobbyIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[0]
          options?: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostLobbiesLobbyIdMessagesMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPutLobbiesLobbyIdMessagesMessageIdModerationMetadataMutationKey() {
  return [
    'lobbies',
    '/lobbies/{lobby_id}/messages/{message_id}/moderation-metadata',
    'PUT',
  ] as const
}

export function getPutLobbiesLobbyIdMessagesMessageIdModerationMetadataMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.lobbies>[0],
  params2: Parameters<ReturnType<typeof client.lobbies>['messages']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutLobbiesLobbyIdMessagesMessageIdModerationMetadataMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .lobbies(params)
        .messages(params2)
        ['moderation-metadata'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutLobbiesLobbyIdMessagesMessageIdModerationMetadata<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.lobbies>[0],
  params2: () => Parameters<ReturnType<typeof client.lobbies>['messages']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<typeof client.lobbies>['messages']
              >['moderation-metadata']['put']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutLobbiesLobbyIdMessagesMessageIdModerationMetadataMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getOauth2MeQueryKey() {
  return ['oauth2', '/oauth2/@me'] as const
}

export function getOauth2MeQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>['error'], null>,
>(options?: Parameters<(typeof client.oauth2)['@me']['get']>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getOauth2MeQueryKey>
  >({
    queryKey: getOauth2MeQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.oauth2['@me'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectOauth2Me<
  TData = Extract<
    Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getOauth2MeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.oauth2)['@me']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getOauth2MeQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getOauth2ApplicationsMeQueryKey() {
  return ['oauth2', '/oauth2/applications/@me'] as const
}

export function getOauth2ApplicationsMeQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>['error'],
    null
  >,
>(options?: Parameters<(typeof client.oauth2.applications)['@me']['get']>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getOauth2ApplicationsMeQueryKey>
  >({
    queryKey: getOauth2ApplicationsMeQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.oauth2.applications['@me'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectOauth2ApplicationsMe<
  TData = Extract<
    Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getOauth2ApplicationsMeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.oauth2.applications)['@me']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getOauth2ApplicationsMeQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getOauth2KeysQueryKey() {
  return ['oauth2', '/oauth2/keys'] as const
}

export function getOauth2KeysQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.keys.get>>['error'], null>,
>(options?: Parameters<typeof client.oauth2.keys.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getOauth2KeysQueryKey>
  >({
    queryKey: getOauth2KeysQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.oauth2.keys.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectOauth2Keys<
  TData = Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.keys.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getOauth2KeysQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.oauth2.keys.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getOauth2KeysQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getOauth2UserinfoQueryKey() {
  return ['oauth2', '/oauth2/userinfo'] as const
}

export function getOauth2UserinfoQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>['error'], null>,
>(options?: Parameters<typeof client.oauth2.userinfo.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getOauth2UserinfoQueryKey>
  >({
    queryKey: getOauth2UserinfoQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.oauth2.userinfo.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectOauth2Userinfo<
  TData = Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getOauth2UserinfoQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.oauth2.userinfo.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getOauth2UserinfoQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataMutationKey() {
  return [
    'partner-sdk',
    '/partner-sdk/dms/{user_id_1}/{user_id_2}/messages/{message_id}/moderation-metadata',
    'PUT',
  ] as const
}

export function getPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
        >['moderation-metadata']['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<(typeof client)['partner-sdk']['dms']>[0],
  params2: Parameters<ReturnType<(typeof client)['partner-sdk']['dms']>>[0],
  params3: Parameters<ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<
            ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
          >['moderation-metadata']['put']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<
          ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
        >['moderation-metadata']['put']
      >[0]
      options?: Parameters<
        ReturnType<
          ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
        >['moderation-metadata']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['partner-sdk']
        .dms(params)(params2)
        .messages(params3)
        ['moderation-metadata'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
        >['moderation-metadata']['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<(typeof client)['partner-sdk']['dms']>[0],
  params2: () => Parameters<ReturnType<(typeof client)['partner-sdk']['dms']>>[0],
  params3: () => Parameters<
    ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
  >[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<
                ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
              >['moderation-metadata']['put']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<
              ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
            >['moderation-metadata']['put']
          >[0]
          options?: Parameters<
            ReturnType<
              ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
            >['moderation-metadata']['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults =
      getPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataMutationOptions<
        TError,
        TOnMutateResult
      >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostPartnerSdkProvisionalAccountsUnmergeMutationKey() {
  return ['partner-sdk', '/partner-sdk/provisional-accounts/unmerge', 'POST'] as const
}

export function getPostPartnerSdkProvisionalAccountsUnmergeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>[0]
      options?: Parameters<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPartnerSdkProvisionalAccountsUnmergeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['partner-sdk']['provisional-accounts'].unmerge.post(
        body,
        options,
      )
      if (error) throw error
      return data
    },
  })
}

export function injectPostPartnerSdkProvisionalAccountsUnmerge<
  TError = Exclude<
    Awaited<
      ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
          >[0]
          options?: Parameters<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostPartnerSdkProvisionalAccountsUnmergeMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostPartnerSdkProvisionalAccountsUnmergeBotMutationKey() {
  return ['partner-sdk', '/partner-sdk/provisional-accounts/unmerge/bot', 'POST'] as const
}

export function getPostPartnerSdkProvisionalAccountsUnmergeBotMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
      >[0]
      options?: Parameters<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPartnerSdkProvisionalAccountsUnmergeBotMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['partner-sdk']['provisional-accounts'].unmerge.bot.post(
        body,
        options,
      )
      if (error) throw error
      return data
    },
  })
}

export function injectPostPartnerSdkProvisionalAccountsUnmergeBot<
  TError = Exclude<
    Awaited<
      ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
          >[0]
          options?: Parameters<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostPartnerSdkProvisionalAccountsUnmergeBotMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostPartnerSdkTokenMutationKey() {
  return ['partner-sdk', '/partner-sdk/token', 'POST'] as const
}

export function getPostPartnerSdkTokenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client)['partner-sdk']['token']['post']>[0]
      options?: Parameters<(typeof client)['partner-sdk']['token']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPartnerSdkTokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['partner-sdk'].token.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostPartnerSdkToken<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<(typeof client)['partner-sdk']['token']['post']>[0]
          options?: Parameters<(typeof client)['partner-sdk']['token']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostPartnerSdkTokenMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostPartnerSdkTokenBotMutationKey() {
  return ['partner-sdk', '/partner-sdk/token/bot', 'POST'] as const
}

export function getPostPartnerSdkTokenBotMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[0]
      options?: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPartnerSdkTokenBotMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['partner-sdk'].token.bot.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostPartnerSdkTokenBot<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[0]
          options?: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostPartnerSdkTokenBotMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getSkusSkuIdSubscriptionsQueryKey(
  params: Parameters<typeof client.skus>[0],
  options?: Parameters<ReturnType<typeof client.skus>['subscriptions']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['skus', '/skus/{sku_id}/subscriptions', params, keyArgs] as const
}

export function getSkusSkuIdSubscriptionsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.skus>[0],
  options?: Parameters<ReturnType<typeof client.skus>['subscriptions']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getSkusSkuIdSubscriptionsQueryKey>
  >({
    queryKey: getSkusSkuIdSubscriptionsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .skus(params)
        .subscriptions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectSkusSkuIdSubscriptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.skus>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getSkusSkuIdSubscriptionsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.skus>['subscriptions']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getSkusSkuIdSubscriptionsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getSkusSkuIdSubscriptionsSubscriptionIdQueryKey(
  params: Parameters<typeof client.skus>[0],
  params2: Parameters<ReturnType<typeof client.skus>['subscriptions']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'skus',
    '/skus/{sku_id}/subscriptions/{subscription_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function getSkusSkuIdSubscriptionsSubscriptionIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.skus>[0],
  params2: Parameters<ReturnType<typeof client.skus>['subscriptions']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getSkusSkuIdSubscriptionsSubscriptionIdQueryKey>
  >({
    queryKey: getSkusSkuIdSubscriptionsSubscriptionIdQueryKey(params, params2, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .skus(params)
        .subscriptions(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectSkusSkuIdSubscriptionsSubscriptionId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.skus>[0],
  params2: () => Parameters<ReturnType<typeof client.skus>['subscriptions']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getSkusSkuIdSubscriptionsSubscriptionIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getSkusSkuIdSubscriptionsSubscriptionIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getSoundboardDefaultSoundsQueryKey() {
  return ['soundboard-default-sounds', '/soundboard-default-sounds'] as const
}

export function getSoundboardDefaultSoundsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>['error'],
    null
  >,
>(options?: Parameters<(typeof client)['soundboard-default-sounds']['get']>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getSoundboardDefaultSoundsQueryKey>
  >({
    queryKey: getSoundboardDefaultSoundsQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client['soundboard-default-sounds'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectSoundboardDefaultSounds<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getSoundboardDefaultSoundsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client)['soundboard-default-sounds']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getSoundboardDefaultSoundsQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getPostStageInstancesMutationKey() {
  return ['stage-instances', '/stage-instances', 'POST'] as const
}

export function getPostStageInstancesMutationOptions<
  TError = Exclude<Awaited<ReturnType<(typeof client)['stage-instances']['post']>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client)['stage-instances']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client)['stage-instances']['post']>[0]
      options?: Parameters<(typeof client)['stage-instances']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostStageInstancesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['stage-instances'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostStageInstances<
  TError = Exclude<Awaited<ReturnType<(typeof client)['stage-instances']['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<(typeof client)['stage-instances']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<(typeof client)['stage-instances']['post']>[0]
          options?: Parameters<(typeof client)['stage-instances']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostStageInstancesMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getStageInstancesChannelIdQueryKey(
  params: Parameters<(typeof client)['stage-instances']>[0],
) {
  return ['stage-instances', '/stage-instances/{channel_id}', params] as const
}

export function getStageInstancesChannelIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['stage-instances']>[0],
  options?: Parameters<ReturnType<(typeof client)['stage-instances']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getStageInstancesChannelIdQueryKey>
  >({
    queryKey: getStageInstancesChannelIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client['stage-instances'](params).get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectStageInstancesChannelId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<(typeof client)['stage-instances']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getStageInstancesChannelIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<(typeof client)['stage-instances']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getStageInstancesChannelIdQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getDeleteStageInstancesChannelIdMutationKey() {
  return ['stage-instances', '/stage-instances/{channel_id}', 'DELETE'] as const
}

export function getDeleteStageInstancesChannelIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<(typeof client)['stage-instances']>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[0]
      options?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteStageInstancesChannelIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['stage-instances'](params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteStageInstancesChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<(typeof client)['stage-instances']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[0]
          options?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteStageInstancesChannelIdMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchStageInstancesChannelIdMutationKey() {
  return ['stage-instances', '/stage-instances/{channel_id}', 'PATCH'] as const
}

export function getPatchStageInstancesChannelIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<(typeof client)['stage-instances']>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[0]
      options?: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchStageInstancesChannelIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['stage-instances'](params).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchStageInstancesChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<(typeof client)['stage-instances']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[0]
          options?: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchStageInstancesChannelIdMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getStickerPacksQueryKey() {
  return ['sticker-packs', '/sticker-packs'] as const
}

export function getStickerPacksQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>['error'], null>,
>(options?: Parameters<(typeof client)['sticker-packs']['get']>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getStickerPacksQueryKey>
  >({
    queryKey: getStickerPacksQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client['sticker-packs'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectStickerPacks<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getStickerPacksQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client)['sticker-packs']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getStickerPacksQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getStickerPacksPackIdQueryKey(
  params: Parameters<(typeof client)['sticker-packs']>[0],
) {
  return ['sticker-packs', '/sticker-packs/{pack_id}', params] as const
}

export function getStickerPacksPackIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['sticker-packs']>[0],
  options?: Parameters<ReturnType<(typeof client)['sticker-packs']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getStickerPacksPackIdQueryKey>
  >({
    queryKey: getStickerPacksPackIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client['sticker-packs'](params).get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectStickerPacksPackId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<(typeof client)['sticker-packs']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getStickerPacksPackIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<(typeof client)['sticker-packs']>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getStickerPacksPackIdQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}

export function getStickersStickerIdQueryKey(params: Parameters<typeof client.stickers>[0]) {
  return ['stickers', '/stickers/{sticker_id}', params] as const
}

export function getStickersStickerIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.stickers>[0],
  options?: Parameters<ReturnType<typeof client.stickers>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getStickersStickerIdQueryKey>
  >({
    queryKey: getStickersStickerIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .stickers(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectStickersStickerId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.stickers>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getStickersStickerIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.stickers>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getStickersStickerIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  })
}

export function getUsersMeQueryKey() {
  return ['users', '/users/@me'] as const
}

export function getUsersMeQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.users)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client.users)['@me']['get']>>['error'], null>,
>(options?: Parameters<(typeof client.users)['@me']['get']>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<(typeof client.users)['@me']['get']>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getUsersMeQueryKey>
  >({
    queryKey: getUsersMeQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.users['@me'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectUsersMe<
  TData = Extract<
    Awaited<ReturnType<(typeof client.users)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client.users)['@me']['get']>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<(typeof client.users)['@me']['get']>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getUsersMeQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.users)['@me']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersMeQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getPatchUsersMeMutationKey() {
  return ['users', '/users/@me', 'PATCH'] as const
}

export function getPatchUsersMeMutationOptions<
  TError = Exclude<Awaited<ReturnType<(typeof client.users)['@me']['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<(typeof client.users)['@me']['patch']>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<(typeof client.users)['@me']['patch']>[0]
      options?: Parameters<(typeof client.users)['@me']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchUsersMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users['@me'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchUsersMe<
  TError = Exclude<Awaited<ReturnType<(typeof client.users)['@me']['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<(typeof client.users)['@me']['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<(typeof client.users)['@me']['patch']>[0]
          options?: Parameters<(typeof client.users)['@me']['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchUsersMeMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getUsersMeApplicationsApplicationIdEntitlementsQueryKey(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: Parameters<
    ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'users',
    '/users/@me/applications/{application_id}/entitlements',
    params,
    keyArgs,
  ] as const
}

export function getUsersMeApplicationsApplicationIdEntitlementsQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: Parameters<
    ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getUsersMeApplicationsApplicationIdEntitlementsQueryKey>
  >({
    queryKey: getUsersMeApplicationsApplicationIdEntitlementsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.users['@me']
        .applications(params)
        .entitlements.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectUsersMeApplicationsApplicationIdEntitlements<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getUsersMeApplicationsApplicationIdEntitlementsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getUsersMeApplicationsApplicationIdEntitlementsQueryOptions<TData, TError>(
        params(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getUsersMeApplicationsApplicationIdRoleConnectionQueryKey(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
) {
  return ['users', '/users/@me/applications/{application_id}/role-connection', params] as const
}

export function getUsersMeApplicationsApplicationIdRoleConnectionQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: Parameters<
    ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
        >
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getUsersMeApplicationsApplicationIdRoleConnectionQueryKey>
  >({
    queryKey: getUsersMeApplicationsApplicationIdRoleConnectionQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.users['@me']
        .applications(params)
        ['role-connection'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectUsersMeApplicationsApplicationIdRoleConnection<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getUsersMeApplicationsApplicationIdRoleConnectionQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getUsersMeApplicationsApplicationIdRoleConnectionQueryOptions<TData, TError>(
        params(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPutUsersMeApplicationsApplicationIdRoleConnectionMutationKey() {
  return ['users', '/users/@me/applications/{application_id}/role-connection', 'PUT'] as const
}

export function getPutUsersMeApplicationsApplicationIdRoleConnectionMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<(typeof client.users)['@me']['applications']>[0]) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
      >[0]
      options?: Parameters<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutUsersMeApplicationsApplicationIdRoleConnectionMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users['@me']
        .applications(params)
        ['role-connection'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPutUsersMeApplicationsApplicationIdRoleConnection<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
          >[0]
          options?: Parameters<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutUsersMeApplicationsApplicationIdRoleConnectionMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationKey() {
  return ['users', '/users/@me/applications/{application_id}/role-connection', 'DELETE'] as const
}

export function getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<(typeof client.users)['@me']['applications']>[0]) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
      >[0]
      options?: Parameters<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users['@me']
        .applications(params)
        ['role-connection'].delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteUsersMeApplicationsApplicationIdRoleConnection<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
          >[0]
          options?: Parameters<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostUsersMeChannelsMutationKey() {
  return ['users', '/users/@me/channels', 'POST'] as const
}

export function getPostUsersMeChannelsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client.users)['@me']['channels']['post']>[0]
      options?: Parameters<(typeof client.users)['@me']['channels']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostUsersMeChannelsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users['@me'].channels.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostUsersMeChannels<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<(typeof client.users)['@me']['channels']['post']>[0]
          options?: Parameters<(typeof client.users)['@me']['channels']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostUsersMeChannelsMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getUsersMeConnectionsQueryKey() {
  return ['users', '/users/@me/connections'] as const
}

export function getUsersMeConnectionsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>['error'],
    null
  >,
>(options?: Parameters<(typeof client.users)['@me']['connections']['get']>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getUsersMeConnectionsQueryKey>
  >({
    queryKey: getUsersMeConnectionsQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.users['@me'].connections.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectUsersMeConnections<
  TData = Extract<
    Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getUsersMeConnectionsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.users)['@me']['connections']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersMeConnectionsQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getUsersMeGuildsQueryKey(
  options?: Parameters<(typeof client.users)['@me']['guilds']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['users', '/users/@me/guilds', keyArgs] as const
}

export function getUsersMeGuildsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>['error'],
    null
  >,
>(options?: Parameters<(typeof client.users)['@me']['guilds']['get']>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getUsersMeGuildsQueryKey>
  >({
    queryKey: getUsersMeGuildsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.users['@me'].guilds.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectUsersMeGuilds<
  TData = Extract<
    Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getUsersMeGuildsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.users)['@me']['guilds']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersMeGuildsQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getDeleteUsersMeGuildsGuildIdMutationKey() {
  return ['users', '/users/@me/guilds/{guild_id}', 'DELETE'] as const
}

export function getDeleteUsersMeGuildsGuildIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<(typeof client.users)['@me']['guilds']>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[0]
      options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteUsersMeGuildsGuildIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users['@me'].guilds(params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteUsersMeGuildsGuildId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<(typeof client.users)['@me']['guilds']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[0]
          options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteUsersMeGuildsGuildIdMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getUsersMeGuildsGuildIdMemberQueryKey(
  params: Parameters<(typeof client.users)['@me']['guilds']>[0],
) {
  return ['users', '/users/@me/guilds/{guild_id}/member', params] as const
}

export function getUsersMeGuildsGuildIdMemberQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['guilds']>[0],
  options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getUsersMeGuildsGuildIdMemberQueryKey>
  >({
    queryKey: getUsersMeGuildsGuildIdMemberQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.users['@me']
        .guilds(params)
        .member.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectUsersMeGuildsGuildIdMember<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<(typeof client.users)['@me']['guilds']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getUsersMeGuildsGuildIdMemberQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getUsersMeGuildsGuildIdMemberQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
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

export function injectUsersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.users>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
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
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getUsersUserIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  })
}

export function getVoiceRegionsQueryKey() {
  return ['voice', '/voice/regions'] as const
}

export function getVoiceRegionsQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.voice.regions.get>>['error'], null>,
>(options?: Parameters<typeof client.voice.regions.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getVoiceRegionsQueryKey>
  >({
    queryKey: getVoiceRegionsQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.voice.regions.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectVoiceRegions<
  TData = Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.voice.regions.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getVoiceRegionsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.voice.regions.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getVoiceRegionsQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getWebhooksWebhookIdQueryKey(params: Parameters<typeof client.webhooks>[0]) {
  return ['webhooks', '/webhooks/{webhook_id}', params] as const
}

export function getWebhooksWebhookIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.webhooks>[0],
  options?: Parameters<ReturnType<typeof client.webhooks>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getWebhooksWebhookIdQueryKey>
  >({
    queryKey: getWebhooksWebhookIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .webhooks(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectWebhooksWebhookId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>['error'], null>,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getWebhooksWebhookIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.webhooks>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getWebhooksWebhookIdQueryOptions<TData, TError>(params(), clientOptions), ...query }
  })
}

export function getDeleteWebhooksWebhookIdMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}', 'DELETE'] as const
}

export function getDeleteWebhooksWebhookIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.webhooks>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.webhooks>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.webhooks>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteWebhooksWebhookIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhooks(params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteWebhooksWebhookId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.webhooks>['delete']>[0]
          options?: Parameters<ReturnType<typeof client.webhooks>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteWebhooksWebhookIdMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchWebhooksWebhookIdMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}', 'PATCH'] as const
}

export function getPatchWebhooksWebhookIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.webhooks>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.webhooks>['patch']>[0]
      options?: Parameters<ReturnType<typeof client.webhooks>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchWebhooksWebhookIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhooks(params).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchWebhooksWebhookId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.webhooks>['patch']>[0]
          options?: Parameters<ReturnType<typeof client.webhooks>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchWebhooksWebhookIdMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getWebhooksWebhookIdWebhookTokenQueryKey(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
) {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', params, params2] as const
}

export function getWebhooksWebhookIdWebhookTokenQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getWebhooksWebhookIdWebhookTokenQueryKey>
  >({
    queryKey: getWebhooksWebhookIdWebhookTokenQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .webhooks(params)(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectWebhooksWebhookIdWebhookToken<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getWebhooksWebhookIdWebhookTokenQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getWebhooksWebhookIdWebhookTokenQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getPostWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', 'POST'] as const
}

export function getPostWebhooksWebhookIdWebhookTokenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostWebhooksWebhookIdWebhookTokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhooks(params)(params2).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostWebhooksWebhookIdWebhookTokenMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getDeleteWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', 'DELETE'] as const
}

export function getDeleteWebhooksWebhookIdWebhookTokenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteWebhooksWebhookIdWebhookTokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhooks(params)(params2).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteWebhooksWebhookIdWebhookTokenMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', 'PATCH'] as const
}

export function getPatchWebhooksWebhookIdWebhookTokenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchWebhooksWebhookIdWebhookTokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhooks(params)(params2).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchWebhooksWebhookIdWebhookTokenMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostWebhooksWebhookIdWebhookTokenGithubMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}/github', 'POST'] as const
}

export function getPostWebhooksWebhookIdWebhookTokenGithubMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostWebhooksWebhookIdWebhookTokenGithubMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhooks(params)(params2).github.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostWebhooksWebhookIdWebhookTokenGithub<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostWebhooksWebhookIdWebhookTokenGithubMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
    params,
    params2,
    keyArgs,
  ] as const
}

export function getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey>
  >({
    queryKey: getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(params, params2, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .webhooks(params)(params2)
        .messages['@original'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectWebhooksWebhookIdWebhookTokenMessagesOriginal<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey() {
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
    'DELETE',
  ] as const
}

export function getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(params)(params2)
        .messages['@original'].delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}/messages/@original', 'PATCH'] as const
}

export function getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(params)(params2)
        .messages['@original'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchWebhooksWebhookIdWebhookTokenMessagesOriginal<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryOptions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey>
  >({
    queryKey: getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(
      params,
      params2,
      params3,
      options,
    ),
    queryFn: async ({ signal }) => {
      const { data, error } = await client
        .webhooks(params)(params2)
        .messages(params3)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectWebhooksWebhookIdWebhookTokenMessagesMessageId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: () => Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
            >
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
    >[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryOptions<TData, TError>(
        params(),
        params2(),
        params3(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey() {
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    'DELETE',
  ] as const
}

export function getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(params)(params2)
        .messages(params3)
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: () => Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey() {
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    'PATCH',
  ] as const
}

export function getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(params)(params2)
        .messages(params3)
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPatchWebhooksWebhookIdWebhookTokenMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: () => Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
            >
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2(), params3())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostWebhooksWebhookIdWebhookTokenSlackMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}/slack', 'POST'] as const
}

export function getPostWebhooksWebhookIdWebhookTokenSlackMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostWebhooksWebhookIdWebhookTokenSlackMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhooks(params)(params2).slack.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostWebhooksWebhookIdWebhookTokenSlack<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.webhooks>[0],
  params2: () => Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[0]
          options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostWebhooksWebhookIdWebhookTokenSlackMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}
