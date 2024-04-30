import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { renderToStream } from "react-streaming/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { AppPage } from "./utils/App";
import generateAppHead from "./utils/AppHead";
import { AppScriptBody } from "./utils/AppScriptBody";
import { getMetaHtml } from "./utils/getMetaHtml";

const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const appHead = generateAppHead(pageContext);
  const { stream = false, _streamIsRequired } = pageContext.config || {};
  const lang = pageContext?.metadata?.locale || pageContext?.locale || "en";
  const metaHtml = getMetaHtml(pageContext);

  let pageHtml:
    | string
    | ReturnType<typeof dangerouslySkipEscape>
    | Awaited<ReturnType<typeof renderToStream>>;

  const page = AppPage(pageContext) as ReactNode;
  if (!stream && !_streamIsRequired) {
    pageHtml = dangerouslySkipEscape(renderToString(page));
  } else {
    const disable = stream === false ? true : undefined;
    pageHtml = await renderToStream(page, {
      userAgent: pageContext.metadata?.userAgent,
      disable,
    });
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${lang}" ${metaHtml}>
      <head>${appHead}</head>
      <body>
        <div id="root">${pageHtml}${AppScriptBody}</>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
    },
  };
};

export default onRenderHtml;
