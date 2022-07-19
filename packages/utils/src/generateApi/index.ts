const defaultOptions: FetchOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

const METHODS: ReadonlyArray<string> = ['post', 'put', 'delete', 'patch'];

export function generateApi(
  baseUrl: string,
  fetchAPI = baseFetchApi,
  opts = defaultOptions
): ClientBuilder {
  // Callable internal target required to use `apply` on it
  const internalTarget = (() => {}) as ClientBuilder;

  const p = (url: string): ClientBuilder =>
    new Proxy(internalTarget, {
      get(_target, key: string) {
        if (!['get', ...METHODS].includes(key)) {
          return p(`${url}/${key}`);
        }

        // @ts-expect-error Ignore type checking
        const handler: ClientMethodHandler = (data, interceptors) => {
          const payloadOpts: FetchOptions = {
            ...opts,
            method: key.toUpperCase()
          };

          if (interceptors) {
            interceptors.forEach(interceptor => {
              interceptor(payloadOpts);
            });
          }
          if (key === 'get' && data) {
            // @ts-expect-error Ignore type checking
            const searchParams = `?${new URLSearchParams(data)}`;
            // eslint-disable-next-line no-param-reassign
            url = `${url}${data ? searchParams : ''}`;
          } else if (METHODS.includes(key)) {
            payloadOpts.body = JSON.stringify(data);
          }

          return fetchAPI<Response>(url, payloadOpts);
        };

        return handler;
      },
      apply(_target, _thisArg, args: (string | number) | (string | number)[]) {
        const _url = Array.isArray(args)
          ? `${url}/${args.map(i => `${i}`).join('/')}`
          : `${url}/${args}`;

        return p(_url);
      }
    });

  return p(baseUrl);
}

export async function baseFetchApi<Response>(url: string, opts?: RequestInit) {
  if (!url) {
    return;
  }
  const resp = await fetch(url, opts);
  if (resp.ok && resp.status === 200) {
    const json = await resp.json();
    return json as Response;
  }
  if (resp.status >= 400 && resp.status < 500) {
    const json = await resp.json();
    throw json;
  }
}

interface ResponseMap {
  blob: Blob;
  text: string;
  arrayBuffer: ArrayBuffer;
}

export type ResponseType = keyof ResponseMap | 'json';

export type Interceptor = (request: RequestInit) => void;

export type FetchOptions = Partial<RequestInit>;

export type MappedType<
  R extends ResponseType,
  JsonType = any
> = R extends keyof ResponseMap ? ResponseMap[R] : JsonType;

export type ClientMethodHandler = <T = any, R extends ResponseType = 'json'>(
  data?: RequestInit['body'] | Record<string, any>,
  interceptors?: Interceptor[]
) => Promise<MappedType<R, T>>;

export type ClientBuilder = {
  [K: string]: ClientBuilder;
  (...segmentsOrIds: (string | number)[]): ClientBuilder;
} & {
  get: ClientMethodHandler;
  post: ClientMethodHandler;
  put: ClientMethodHandler;
  delete: ClientMethodHandler;
  patch: ClientMethodHandler;
};
