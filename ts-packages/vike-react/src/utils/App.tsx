import React from "react";
import type { PageContext } from "vike/types";
import { PageContextProvider } from "./PageContextProvider";

export function AppPage(pageContext: PageContext) {
  const Layout = pageContext.config?.Layout || PassThrough;
  const ReactQueryProvider = pageContext.config?.ReactQueryProvider || PassThrough;
  const { Page, pageProps } = pageContext;
  const AppWrapper = pageContext.config?.AppWrapper || PassThrough;

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
