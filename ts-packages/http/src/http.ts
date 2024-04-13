import { type HttpMethod } from "./http.const";
import type { HttpFetchOptions, HttpHooks, HttpInput, HttpInternalOptions, HttpOptions } from "./http.types";
import { normalizeHttpRetryOptions } from "./http.utils";
import { mergeDeep } from '@techmely/utils';

export class Http {
  #retryCount = 0;
  #input: HttpInput;
  #options: HttpInternalOptions

  static create(input: HttpInput, options: HttpFetchOptions) {

  }

  constructor(input: HttpInput, options: HttpFetchOptions = {}) {
    this.#input = input
    const defaultHooks: HttpHooks = {
					beforeRequest: [],
					beforeRetry: [],
					beforeError: [],
					afterResponse: [],
				}
    this.#options = {
      method: options.method || ((this.#input as Request).method as HttpMethod),
      retry: normalizeHttpRetryOptions(options.retry),
      timeout: options.timeout || 10000,
      $fetch: options.$fetch || globalThis.fetch.bind(globalThis),
      hooks: mergeDeep(defaultHooks, options.hooks)
    }
  }

  async #retry<T extends (...arguments_: any) => Promise<any>>(fn: T): Promise<ReturnType<T> | void {
    try {
      return await fn()
    } catch {

    }
  }
}
