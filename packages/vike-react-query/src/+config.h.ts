import type { Config } from "vike/types";
import FallbackErrorBoundary from "./FallbackErrorBoundary";
import ReactQueryProvider from "./ReactQueryProvider";

const config: Config = {
  queryClientConfig: undefined,
  ReactQueryProvider,
  FallbackErrorBoundary,
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
