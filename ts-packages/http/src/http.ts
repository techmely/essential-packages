import { isSupportsRequestStreams, mergeDeep } from "@techmely/utils";
import { ExceptionBase } from "./exceptions";
import type { HttpMethod } from "./http.const";
import type {
  HttpFetchHookOptions,
  HttpFetchOptions,
  HttpHooks,
  HttpInput,
  HttpInternalOptions,
  HttpTimeoutOptions,
} from "./http.types";
import { fetchTimeOut, mergeHttpHeaders, normalizeHttpRetryOptions } from "./http.utils";

export class Http {
  #retryCount = 0;
  #abortController = new globalThis.AbortController();
  #input: HttpInput;
  #options: HttpInternalOptions;
  request: Request;

  static create(input: HttpInput, options: HttpFetchOptions) {
    const http = new Http(input, options);
    async function fetchFn(): Promise<Response> {
      // Delay the fetch so that body method shortcuts can set the Accept Header
      await Promise.resolve();
      let response = await http.#fetch();
      for (const hook of http.#options.hooks.afterResponse) {
        const hookedRes = await hook(
          http.request,
          http.#options as unknown as HttpFetchHookOptions,
          http.#jsonifyResponse(response.clone()),
        );
        if (hookedRes instanceof globalThis.Response) {
          response = hookedRes;
        }
      }
      http.#jsonifyResponse(response);
      if (!response.ok) {
        const code = response.status;
        const message = response.statusText;
        const error = new ExceptionBase(message);
      }
    }
  }

  constructor(input: HttpInput, options: HttpFetchOptions = {}) {
    this.#validateProps(input, options);
    this.#input = input;
    const defaultHooks: HttpHooks = {
      beforeRequest: [],
      beforeRetry: [],
      beforeError: [],
      afterResponse: [],
    };
    const hooks = (options.hooks
      ? mergeDeep(defaultHooks, options.hooks)
      : defaultHooks) as unknown as Required<HttpHooks>;

    this.#options = {
      ...options,
      headers: mergeHttpHeaders((this.#input as Request).headers, options.headers),
      method: options.method || ((this.#input as Request).method as HttpMethod),
      retry: normalizeHttpRetryOptions(options.retry),
      timeout: options.timeout || 10000,
      $fetch: options.$fetch || globalThis.fetch.bind(globalThis),
      hooks,
      signal: this.#abortController.signal,
    };
    this.#options.signal?.addEventListener("abort", () => {
      this.#abortController.abort(this.#options.signal?.reason);
    });
    if (isSupportsRequestStreams()) {
      // @ts-expect-error - Types are outdated.
      this.#options.duplex = "half";
    }

    this.request = new globalThis.Request(this.#input, this.#options);
  }

  async #fetch() {
    for (const hook of this.#options.hooks.beforeRequest) {
      const result = await hook(this.request, this.#options as HttpFetchHookOptions);
      if (result instanceof Request) {
        this.request = result;
        break;
      }
      if (result instanceof Response) {
        return result;
      }
    }
    if (this.#options.timeout === false && this.#options.$fetch) {
      return this.#options.$fetch(this.request.clone(), this.#options);
    }

    return fetchTimeOut(
      this.request.clone(),
      this.#options,
      this.#abortController,
      this.#options as unknown as HttpTimeoutOptions,
    );
  }

  async #retry<T extends (...arguments_: any) => Promise<any>>(
    fn: T,
  ): Promise<ReturnType<T> | void> {
    try {
      return await fn();
    } catch {}
  }

  #jsonifyResponse(response: Response): Response {
    const parser = this.#options.parseJson;
    if (parser) {
      response.json = async () => parser(await response.text());
    }
    return response;
  }

  async #validateProps(input: HttpInput, options: HttpFetchOptions) {
    if (
      !input ||
      (typeof input !== "string" && !(input instanceof URL || input instanceof globalThis.Request))
    ) {
      throw new Error("`input must be a string, URL, or Request`");
    }
  }
}
