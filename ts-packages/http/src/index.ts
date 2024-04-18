import { Http } from "./http";
import { REQUEST_METHODS } from "./http.const";
import type { HttpFetchOptions, HttpInput, HttpOptions } from "./http.types";

export * from "./exceptions";
export * from "./http";
export * from "./http.const";
export * from "./http.types";

const createInstance = (defaults?: Partial<HttpOptions>) => {
  const http = (input: HttpInput, _options?: HttpFetchOptions) =>
    Http.create(input, { ...defaults, ..._options });

  for (const method of REQUEST_METHODS) {
    http[method] = (input: HttpInput, _options?: HttpFetchOptions) =>
      Http.create(input, { ...defaults, ..._options, method });
  }

  http.create = (newDefaults?: Partial<HttpOptions>) => createInstance(newDefaults);
  http.extend = (newDefaults?: Partial<HttpOptions>) =>
    createInstance({ ...defaults, ...newDefaults });
  http.stop = stop;
  return http;
};

const http = createInstance();

export default http;
