import type { Config, ConfigEnv } from "vike/types";

const serverClient: ConfigEnv = {
  client: true,
  server: true,
};
const clientOnly: ConfigEnv = {
  client: true,
  server: false,
};
const serverOnly: ConfigEnv = {
  client: false,
  server: true,
};

const renderModeMap: Record<RenderMode, ConfigEnv> = {
  SPA: clientOnly,
  SSR: serverClient,
  HTML: serverOnly,
};

const VikeConfig = {
  passToClient: ["pageProps", "metadata", "initStoreState"],
  clientRouting: true,
  hydrationCanBeAborted: true,
  prefetchStaticAssets: "hover",
  onRenderHtml: "import:@techmely/vike-react/onRenderHtml:default",
  onRenderClient: "import:@techmely/vike-react/onRenderClient:default",
  meta: {
    Head: {
      env: serverOnly,
    },
    Layout: {
      env: serverClient,
    },
    ReactQueryProvider: {
      env: serverClient,
    },
    AppWrapper: {
      env: serverClient,
    },
    locale: {
      env: serverClient,
    },
    isr: {
      env: serverOnly,
    },
    stream: {
      env: serverOnly,
    },
    ssr: {
      env: { config: true },
      effect: ({ configValue }) => {
        return {
          meta: {
            Page: {
              env: configValue ? serverClient : clientOnly,
            },
          },
        };
      },
    },
    renderMode: {
      env: { config: true },
      effect: ({ configValue }) => {
        const env = renderModeMap[configValue as RenderMode];
        if (!env) {
          throw new Error(`renderMode must be one of ${Object.keys(renderModeMap).join(", ")}`);
        }
        return { meta: { Page: { env } } };
      },
    },
    plugins: {
      env: serverClient,
    },
    initStoreState: {
      env: serverClient,
    },
  },
  locale: "en",
  renderMode: "SSR",
  initStoreState: {},
} satisfies Config;

export default VikeConfig;
