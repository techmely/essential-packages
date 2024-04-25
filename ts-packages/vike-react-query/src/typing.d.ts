import type { QueryClientConfig } from "@tanstack/react-query";
import type { ReactNode } from "react";

declare global {
  namespace VikePackages {
    interface ConfigVikeReact {
      queryClientConfig?: QueryClientConfig;
      FallbackErrorBoundary: ((props: { children: ReactNode }) => ReactNode) | string;
    }
  }
}
