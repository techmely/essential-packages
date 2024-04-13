import { kebabize, mapObject } from "@techmely/utils";
import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { renderToStream } from "react-streaming/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { AppPage } from "./utils/App";
import generateAppHead from "./utils/AppHead";
import { AppScriptBody } from "./utils/AppScriptBody";

const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const appHead = generateAppHead(pageContext);
  const stream = pageContext.config?.stream || false;
  const lang = pageContext?.metadata?.locale || pageContext?.locale || "en";
  const dataHeadHtml = pageContext?.metadata?.dataHeadHtml;
  const dataHead = dataHeadHtml
    ? Object.entries(mapObject(dataHeadHtml, (k, v) => [`data-${kebabize(k)}`, v.toString()]))
        .reduce((acc, [key, value]) => {
          return acc.concat(" ", `${key}='${value}'`);
        }, "")
        .trimStart()
    : "";

  let pageStream:
    | string
    | ReturnType<typeof dangerouslySkipEscape>
    | Awaited<ReturnType<typeof renderToStream>>;
  if (!pageContext.Page) {
    pageStream = "";
  } else {
    const page = AppPage(pageContext) as ReactNode;
    pageStream = stream
      ? await renderToStream(page, {
          userAgent: pageContext.metadata?.userAgent,
        })
      : dangerouslySkipEscape(renderToString(page));
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${lang}" ${dataHead}>
      <head>${appHead}</head>
      <body>
        <div id="root">${pageStream}${AppScriptBody}</>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
      // initStoreState: store.state.value,
    },
  };
};

export default onRenderHtml;
