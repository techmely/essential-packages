import { resolveURL, withQuery } from 'ufo';
import type { QueryObject } from 'ufo';

interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
}

export type ResponseType = keyof ResponseMap | 'json';

export type MappedType<
  R extends ResponseType,
  JsonType = any
> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;

export type ApiFetchHandler = <T = any, R extends ResponseType = 'json'>(
  data?: RequestInit['body'] | Record<string, any>
) => Promise<MappedType<R, T>>;

export type ApiBuilder = {
  [K: string]: ApiBuilder;
  (...segmentsOrIds: (string | number)[]): ApiBuilder;
} & {
  get: ApiFetchHandler;
  post: ApiFetchHandler;
  put: ApiFetchHandler;
  delete: ApiFetchHandler;
  patch: ApiFetchHandler;
};

type FetchOptions = Partial<RequestInit>;

const defaultOptions: FetchOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * A generator fetch API with Proxies
 * @param baseUrl The URL
 * @param opts Options for fetch API
 * @returns Data with generic type
 */
export function createApi(baseUrl: string, opts = defaultOptions): ApiBuilder {
  // Callable internal target required to use `apply` on it
  const internalTarget = (() => {}) as ApiBuilder;

  const p = (url: string): ApiBuilder =>
    new Proxy(internalTarget, {
      get(_target, key: string) {
        const method = key.toUpperCase();

        if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
          return p(resolveURL(url, key));
        }

        const handler: ApiFetchHandler = <Response = any>(
          data?: RequestInit['body'] | Record<string, any>,
          overridesOpts: RequestInit = {}
        ) => {
          const payloadOpts: FetchOptions = {
            ...opts,
            ...overridesOpts,
            method
          };

          switch (method) {
            case 'POST':
            case 'PUT':
            case 'PATCH':
              payloadOpts.body = JSON.stringify(data);
              break;
            default:
              if (data) url = withQuery(url, data as QueryObject);
          }

          return fetchAPI<Response>(url, payloadOpts);
        };

        return handler;
      },
      apply(_target, _thisArg, args: (string | number)[] = []) {
        return p(resolveURL(url, ...args.map(i => `${i}`)));
      }
    });

  return p(baseUrl);
}

async function fetchAPI<Response>(url: string, opts?: RequestInit) {
  const resp = await fetch(url, opts);
  const json = await resp.json();

  return json as Response;
}
