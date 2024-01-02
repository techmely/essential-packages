import type { QueryClientConfig } from '@tanstack/react-query'
import { ReactNode } from "react"

type ImportString = `import:${string}`;

declare global {
  namespace VikePackages {
    interface ConfigVikeReact {
      queryClientConfig?: QueryClientConfig
      FallbackErrorBoundary: ((props: { children: ReactNode }) => ReactNode) | ImportString
    }
  }
}

export {}
