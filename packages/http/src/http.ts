import { REQUEST_METHODS, type HttpMethod } from "./http.const";
import type { HttpFetchOptions, HttpInput, HttpInternalOptions, HttpOptions } from "./http.types";

export class Http {
  #retryCount = 0;
  #input: HttpInput;
  #options: HttpInternalOptions

  static create(input: HttpInput, options: HttpFetchOptions) {

  }

  constructor(input: HttpInput, options: HttpFetchOptions = {}) {
    this.#input = input
    this.#options = {
      method: options.method || ((this.#input as Request).method as HttpMethod),
      retry: options.retry,
      timeout: options.timeout || 10000,
      $fetch: options.$fetch || globalThis.fetch.bind(globalThis)
    }
  }

  async #retry<T extends (...arguments_: any) => Promise<any>>(fn: T): Promise<ReturnType<T> | void {
    try {
      return await fn()
    } catch {

    }
  }
}
