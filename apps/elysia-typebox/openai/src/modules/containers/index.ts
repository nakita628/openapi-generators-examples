import { Elysia, t } from 'elysia'
import {
  ContainerFileListResourceSchema,
  ContainerFileResourceSchema,
  ContainerListResourceSchema,
  ContainerNetworkPolicyAllowlistParamSchema,
  ContainerNetworkPolicyDisabledParamSchema,
  ContainerNetworkPolicyDomainSecretParamSchema,
  ContainerResourceSchema,
  CreateContainerBodySchema,
  CreateContainerFileBodySchema,
  ErrorSchema,
  ErrorResponseSchema,
  InlineSkillParamSchema,
  InlineSkillSourceParamSchema,
  MisalignmentErrorDetailsResourceSchema,
  SkillReferenceParamSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { ContainersModel } from './model'

export const containers = new Elysia()
  .model({
    ContainerFileListResource: ContainerFileListResourceSchema,
    ContainerFileResource: ContainerFileResourceSchema,
    ContainerListResource: ContainerListResourceSchema,
    ContainerNetworkPolicyAllowlistParam: ContainerNetworkPolicyAllowlistParamSchema,
    ContainerNetworkPolicyDisabledParam: ContainerNetworkPolicyDisabledParamSchema,
    ContainerNetworkPolicyDomainSecretParam: ContainerNetworkPolicyDomainSecretParamSchema,
    ContainerResource: ContainerResourceSchema,
    CreateContainerBody: CreateContainerBodySchema,
    CreateContainerFileBody: CreateContainerFileBodySchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    InlineSkillParam: InlineSkillParamSchema,
    InlineSkillSourceParam: InlineSkillSourceParamSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    SkillReferenceParam: SkillReferenceParamSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/containers', ({ query }) => {}, {
    query: ContainersModel.ListContainersQuery,
    response: { 200: 'ContainerListResource', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'List containers',
      description: 'List Containers',
      operationId: 'ListContainers',
    },
  })
  .post('/containers', ({ body }) => {}, {
    body: 'CreateContainerBody',
    response: { 200: 'ContainerResource', 400: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'Create container',
      description: 'Create Container',
      operationId: 'CreateContainer',
    },
  })
  .get('/containers/:container_id', ({ params }) => {}, {
    params: ContainersModel.RetrieveContainerParams,
    response: { 200: 'ContainerResource', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'Retrieve container',
      description: 'Retrieve Container',
      operationId: 'RetrieveContainer',
    },
  })
  .delete('/containers/:container_id', ({ params }) => {}, {
    params: ContainersModel.DeleteContainerParams,
    response: {
      200: ContainersModel.DeleteContainerResponse200,
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Delete a container',
      description: 'Delete Container',
      operationId: 'DeleteContainer',
    },
  })
  .get('/containers/:container_id/files', ({ params, query }) => {}, {
    params: ContainersModel.ListContainerFilesParams,
    query: ContainersModel.ListContainerFilesQuery,
    response: { 200: 'ContainerFileListResource', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'List container files',
      description: 'List Container files',
      operationId: 'ListContainerFiles',
    },
  })
  .post('/containers/:container_id/files', ({ params, body }) => {}, {
    params: ContainersModel.CreateContainerFileParams,
    body: 'CreateContainerFileBody',
    response: {
      200: 'ContainerFileResource',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Create container file',
      description:
        'Create a Container File\n\nYou can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.\n',
      operationId: 'CreateContainerFile',
    },
  })
  .get('/containers/:container_id/files/:file_id', ({ params }) => {}, {
    params: ContainersModel.RetrieveContainerFileParams,
    response: { 200: 'ContainerFileResource', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'Retrieve container file',
      description: 'Retrieve Container File',
      operationId: 'RetrieveContainerFile',
    },
  })
  .delete('/containers/:container_id/files/:file_id', ({ params }) => {}, {
    params: ContainersModel.DeleteContainerFileParams,
    response: {
      200: ContainersModel.DeleteContainerFileResponse200,
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: [],
      summary: 'Delete a container file',
      description: 'Delete Container File',
      operationId: 'DeleteContainerFile',
    },
  })
  .get('/containers/:container_id/files/:file_id/content', ({ params }) => {}, {
    params: ContainersModel.RetrieveContainerFileContentParams,
    response: { 200: t.Void(), 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: [],
      summary: 'Retrieve container file content',
      description: 'Retrieve Container File Content',
      operationId: 'RetrieveContainerFileContent',
    },
  })
