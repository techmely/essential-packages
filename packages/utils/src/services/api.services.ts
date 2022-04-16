export function baseHeader(headers?: HeadersInit) {
  return {
    'Content-Type': 'application/json',
    ...headers
  };
}

interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
}

export type ResponseType = keyof ResponseMap | 'json';

export type MappedType<
  R extends ResponseType,
  JsonType
> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;

export type ApiFetchHandler = <T, R extends ResponseType = 'json'>(
  data?: RequestInit['body'] | Record<string, any>,
  overridesOpts?: RequestInit
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
  headers: baseHeader()
};

export function generateAPI(
  baseUrl: string,
  opts = defaultOptions
): ApiBuilder {
  if (!fetch) throw new Error('No fetch API available');
  // Callable internal target required to use `apply` on it
  const internalTarget = (() => {}) as ApiBuilder;

  const p = (url: string): ApiBuilder =>
    new Proxy(internalTarget, {
      get(_target, key: string) {
        const method = key.toUpperCase();

        if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
          return p(`${url}/${key}`);
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
          // @ts-expect-error Ignore type check
          const searchParams = `?${new URLSearchParams(data)}`;

          switch (method) {
            case 'POST':
            case 'PUT':
            case 'PATCH':
              payloadOpts.body = JSON.stringify(data);
              break;
            default:
              // eslint-disable-next-line no-param-reassign
              url = `${url}${data && searchParams}`;
          }

          return fetchAPI<Response>(url, payloadOpts);
        };

        return handler;
      },
      apply(_target, _thisArg, [arg] = []) {
        return p(arg ? `${url}/${arg}` : url);
      }
    });

  return p(baseUrl);
}

async function fetchAPI<Response>(url: string, opts?: RequestInit) {
  const resp = await fetch(url, opts);
  const json = await resp.json();

  return json as Response;
}
