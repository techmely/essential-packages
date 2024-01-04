import React from "react";
import type { PageContext } from "vike/types";
import { PageContextProvider } from "./PageContextProvider";

export function AppPage(pageContext: PageContext) {
  const Layout = (pageContext.config.Layout as VikeReactComponent) || PassThrough;
  const ReactQueryProvider =
    (pageContext.config.ReactQueryProvider as VikeReactComponent) || PassThrough;
  const { Page, pageProps } = pageContext;
  const AppWrapper = (pageContext.config.AppWrapper as VikeReactComponent) || PassThrough;

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ReactQueryProvider pageContext={pageContext}>
          <AppWrapper pageContext={pageContext}>
            <Layout>{Page ? <Page {...pageProps} /> : null}</Layout>
          </AppWrapper>
        </ReactQueryProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

function PassThrough({ children }: any) {
  return <>{children}</>;
}
