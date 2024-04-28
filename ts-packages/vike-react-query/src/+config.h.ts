import type { Config } from "vike/types";
import FallbackErrorBoundary from "./FallbackErrorBoundary";
import ReactQueryProvider from "./ReactQueryProvider";

const config = {
  name: "vike-react-query",
  queryClientConfig: undefined,
  ReactQueryProvider,
  FallbackErrorBoundary,
  _streamIsRequied: true,
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
} as unknown as Config;

export default config;
