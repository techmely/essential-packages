import type { HttpInterceptors } from "../types/interceptors";
import type { HttpRetryOptions } from "../types/retry-options";

export type HttpSearchParamsBase =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;
export type HttpSearchParams =
  | HttpSearchParamsBase
  | Record<string, string | number | boolean>
  | Array<Array<string | number | boolean>>;
export type HttpHeadersInit =
  | NonNullable<RequestInit["headers"]>
  | Record<string, string | undefined>;
export type HttpInput = string | URL | Request;

export type HttpOptions = {
  /**
	Shortcut for sending JSON. Use this instead of the `body` option.

	Accepts any plain object or value, which will be `JSON.stringify()`'d and sent in the body with the correct header set.
	*/
  json?: unknown;

  /**
	User-defined JSON-parsing function.
	Use-cases:
	1. Parse JSON via the [`bourne` package](https://github.com/hapijs/bourne) to protect from prototype pollution.
	2. Parse JSON with [`reviver` option of `JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).
  3. Parse JSON via the [`superjson` package](https://github.com/blitz-js/superjson) to safely serialize JavaScript expressions
	@default JSON.parse()
	@example
	```
	import http from '@techmely/http';
	import bourne from '@hapijs/bourne';

	const result = await http('https://api.endpoint.com', {
		parseJson: text => bourne(text)
	}).json();
	```
	*/
  parseJson?: (text: string) => unknown;

  /**
	Search parameters to include in the request URL. Setting this will override all existing search parameters in the input URL.

	Accepts any value supported by [`URLSearchParams()`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams).
	*/
  searchParams?: HttpSearchParams;

  /**
	  An object representing `limit`, `methods`, `statusCodes` and `maxRetryAfter` fields for maximum retry count, allowed methods, allowed status codes and maximum [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) time.

	  If `retry` is a number, it will be used as `limit` and other defaults will remain in place.

	  If `maxRetryAfter` is set to `undefined`, it will use `options.timeout`. If [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) header is greater than `maxRetryAfter`, it will cancel the request.

	  By default, delays between retries are calculated with the function `0.3 * (2 ** (attemptCount - 1)) * 1000`, where `attemptCount` is the attempt number (starts from 1), however this can be changed by passing a `delay` function.

	  Retries are not triggered following a timeout.

	  @example
	  ```
	  import http from '@techmely/http';

	  const result = await http('https://api.endpoint.com', {
	  	retry: {
	  		limit: 10,
	  		methods: ['get'],
	  		statusCodes: [413]
	  	}
	  }).json();
	  ```
	*/
  retry?: HttpRetryOptions | number;

  /**
	Timeout in milliseconds for getting a response, including any retries. Can not be greater than 2147483647.
	If set to `false`, there will be no timeout.

	@default 10000
	*/
  timeout?: number | false;

  /**
	Hooks allow modifications during the request lifecycle. Hook functions may be async and are run serially.
	*/
  interceptors?: HttpInterceptors;
  /**
	User-defined `fetch` function.
	Has to be fully compatible with the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) standard.

	Use-cases:
	1. Use custom `fetch` implementations like [`isomorphic-unfetch`](https://www.npmjs.com/package/isomorphic-unfetch).
	2. Use the `fetch` wrapper function provided by some frameworks that use server-side rendering (SSR).

	@default fetch

	@example
	```
	import http from '@techmely/http';
	import $fetch from 'isomorphic-unfetch';

	const json = await http('https://api.endpoint.com', {$fetch}).json();
	```
	*/
  $fetch?: (input: HttpInput, init?: RequestInit) => Promise<Response>;
};
