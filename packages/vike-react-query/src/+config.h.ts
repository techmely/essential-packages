import type { Config } from "vike/types";

const config: Config = {
  queryClientConfig: undefined,
  ReactQueryProvider: "import:@techmely/vike-react-query/ReactQueryProvider:default",
  FallbackErrorBoundary: "import:@techmely/vike-react-query/FallbackErrorBoundary:default",
  stream: true,
  meta: {
    queryClientConfig: {
      env: {
        server: true,
        client: true,
      },
    },
    FallbackErrorBoundary: {
      env: {
        server: true,
        client: true,
      },
    },
  },
};

export default config;
