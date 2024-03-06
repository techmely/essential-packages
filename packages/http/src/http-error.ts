import type { HttpOptions } from "./http.types";

export class HttpError extends Error {
  public response: Response;
  public request: Request;
  public options: HttpOptions;

  constructor(response: Response, request: Request, options: HttpOptions) {
    const code = response.status || response.status === 0 ? response.status : "";
    const title = response.statusText || "";
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : "an unknown error";

    super(`Request failed with ${reason}`);

    this.name = "HTTPError";
    this.response = response;
    this.request = request;
    this.options = options;
  }
}
