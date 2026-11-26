export const HttpSecurityScheme = { type: 'http', scheme: 'bearer' } as const

export const Oauth2SecurityScheme = {
  type: 'oauth2',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://gitlab.com/oauth/authorize',
      tokenUrl: 'https://gitlab.com/oauth/token',
      refreshUrl: 'https://gitlab.com/oauth/token',
      scopes: {
        api: 'Grants complete read/write access to the API, including all groups and projects, the container registry, the dependency proxy, and the package registry.',
        read_api:
          'Grants read access to the API, including all groups and projects, the container registry, and the package registry.',
        read_user:
          'Grants read-only access to your profile through the /user API endpoint, which includes username, public email, and full name. Also grants access to read-only API endpoints under /users.',
        create_runner: 'Grants create access to the runners.',
        manage_runner: 'Grants access to manage the runners.',
        k8s_proxy:
          'Grants permission to perform Kubernetes API calls using the agent for Kubernetes.',
        self_rotate: 'Grants permission for token to rotate itself.',
        mcp: 'Grants read-write access to remote Model Context Protocol (MCP) server for tools execution.',
        mcp_orbit:
          'Grants access to the Orbit Knowledge Graph MCP server for graph queries and schema retrieval.',
      },
    },
  },
} as const

export const ApiKeySecurityScheme = { type: 'apiKey', name: 'PRIVATE-TOKEN', in: 'header' } as const
