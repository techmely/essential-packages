import type { QueryClientConfig } from "@tanstack/react-query";
import type { ReactNode } from "react";
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

declare global {
  namespace VikePackages {
    interface ConfigVikeReact {
      queryClientConfig?: QueryClientConfig;
      FallbackErrorBoundary: ((props: { children: ReactNode }) => ReactNode) | string;
    }
  }
}

export default config;
