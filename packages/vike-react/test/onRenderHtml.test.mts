// @vitest-environment node

import type { DocumentHtml, TemplateWrapped } from "vike/dist/esm/node/runtime/html/renderHtml";
import type { PageContextServer } from "vike/types";

import { describe, expect, test } from "vitest";
import onRenderHtml from "../src/onRenderHtml";

describe("On render html()", () => {
  test("Should render html with app head tag html", async () => {
    const pageContext = {
      config: {
        Head: {
          title: "Hello world",
          description: "Bonjour",
          robots: {
            index: true,
            follow: false,
          },
        },
      },
    } as unknown as PageContextServer;
    const response = (await onRenderHtml(pageContext)) as {
      documentHtml: DocumentHtml;
    };
    const variables = (response.documentHtml as TemplateWrapped)._template.templateVariables;
    const headVariables = (variables[2] as TemplateWrapped)._template.templateVariables;
    const isContainHeadInfo =
      headVariables.some((v) => v === "Hello world") &&
      headVariables.some((v) => v === "Bonjour") &&
      headVariables.some((v) => v === "index,nofollow");
    expect(isContainHeadInfo).toBe(true);
  });

  test("Should render html contain data head html", async () => {
    const pageContext = {
      metadata: {
        dataHeadHtml: {
          appVersion: "1.1.1",
          gitCommitHash: "abcd1234",
          gitBranch: "HEAD",
        },
      },
    } as unknown as PageContextServer;
    const response = (await onRenderHtml(pageContext)) as {
      documentHtml: DocumentHtml;
    };
    const variables = (response.documentHtml as TemplateWrapped)._template.templateVariables;
    const isContainDataHead = variables.some(
      (v) =>
        v === "data-app-version='1.1.1' data-git-commit-hash='abcd1234' data-git-branch='HEAD'",
    );
    expect(isContainDataHead).toBe(true);
  });
});
