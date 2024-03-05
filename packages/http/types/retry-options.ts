export type HttpRetryOptions = {
	/**
	The number of times to retry failed requests.
	@default 1
	*/
	limit?: number;

	/**
	The HTTP methods allowed to retry.

	@default ['get', 'put', 'head', 'delete', 'options', 'trace']
	*/
	methods?: string[];

	/**
	The HTTP status codes allowed to retry.
	@default [
    408, // Request Timeout
    409, // Conflict
    413, // Content Too Large
    425, // Too Early
    429, // Too Many Requests
    500, // Internal Server Error
    502, // Bad Gateway
    503, // Service Unavailable
    504, //  Gateway Timeout
  ]
	*/
	statusCodes?: number[];

	/**
	The HTTP status codes allowed to retry with a `Retry-After` header.
	@default [413, 429, 503]
	*/
	afterStatusCodes?: number[];

	/**
	If the `Retry-After` header is greater than `maxRetryAfter`, the request will be canceled.
	@default Infinity
	*/
	maxRetryAfter?: number;
};
