import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  AddLiffAppRequestSchema,
  AddLiffAppResponseSchema,
  UpdateLiffAppRequestSchema,
  GetAllLiffAppsResponseSchema,
} from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

export const liffHandler = new Hono()
  .get(
    '/liff/v1/apps',
    describeRoute({
      operationId: 'getAllLIFFApps',
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/liff-server/#get-all-liff-apps',
      },
      summary: 'Get all LIFF apps',
      description: 'Gets information on all the LIFF apps added to the channel.',
      tags: ['liff'],
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(GetAllLiffAppsResponseSchema)),
              example: {
                apps: [
                  {
                    liffId: '{liffId}',
                    view: { type: 'full', url: 'https://example.com/myservice' },
                    description: 'Happy New York',
                    permanentLinkPattern: 'concat',
                  },
                  {
                    liffId: '{liffId}',
                    view: { type: 'tall', url: 'https://example.com/myservice2' },
                    features: { ble: true, qrCode: true },
                    permanentLinkPattern: 'concat',
                    scope: ['profile', 'chat_message.write'],
                    botPrompt: 'none',
                  },
                ],
              },
            },
          },
        },
        '401': { description: 'Authentication failed.\n' },
        '404': { description: 'There is no LIFF app on the channel.\n\n\n\n' },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/liff/v1/apps',
    describeRoute({
      operationId: 'addLIFFApp',
      externalDocs: { url: 'https://developers.line.biz/en/reference/liff-server/#add-liff-app' },
      summary: 'Create LIFF app',
      tags: ['liff'],
      description: 'Adding the LIFF app to a channel',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(AddLiffAppResponseSchema)),
              example: { liffId: '{liffId}' },
            },
          },
        },
        '400': {
          description:
            'This status code means one of the following:\n- The request contains an invalid value.\n- The maximum number of LIFF apps that can be added to the channel has been reached.\n',
        },
        '401': { description: 'Authentication failed.\n\n' },
      },
    }),
    validator('json', toStandardSchemaV1(AddLiffAppRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/liff/v1/apps/:liffId',
    describeRoute({
      operationId: 'updateLIFFApp',
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/liff-server/#update-liff-app',
      },
      summary: 'Update LIFF app from a channel',
      description: 'Update LIFF app settings',
      tags: ['liff'],
      responses: {
        '200': { description: 'OK' },
        '400': { description: 'The request contains an invalid value.\n' },
        '401': { description: 'Authentication failed.\n' },
        '404': {
          description:
            'This status code means one of the following:\n- The specified LIFF app does not exist.\n- The specified LIFF app has been added to another channel.\n',
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ liffId: Type.String() }))),
    validator('json', toStandardSchemaV1(UpdateLiffAppRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/liff/v1/apps/:liffId',
    describeRoute({
      operationId: 'deleteLIFFApp',
      externalDocs: {
        url: 'https://developers.line.biz/en/reference/liff-server/#delete-liff-app',
      },
      summary: 'Delete LIFF app from a channel',
      description: 'Deletes a LIFF app from a channel.\n',
      tags: ['liff'],
      responses: {
        '200': { description: 'OK' },
        '401': { description: 'Authentication failed.\n' },
        '404': {
          description:
            'This status code means one of the following:\n- The specified LIFF app does not exist.\n- The specified LIFF app has been added to another channel.\n\n',
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ liffId: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
