import type { HttpRetryOptions } from "./http.types";
import { httpDefaultRetry, httpRetryStatusCodes } from "./http.const";

export const normalizeRetryOptions = (
  retry: number | HttpRetryOptions = {},
): Required<HttpRetryOptions> => {
  if (typeof retry === "number") {
    return {
      ...httpDefaultRetry,
      limit: retry,
    };
  }

  if (retry.methods && !Array.isArray(retry.methods)) {
    throw new Error("retry.methods must be an array");
  }

  if (retry.statusCodes && !Array.isArray(retry.statusCodes)) {
    throw new Error("retry.statusCodes must be an array");
  }

  return {
    ...httpDefaultRetry,
    ...retry,
    afterStatusCodes: httpRetryStatusCodes,
  };
};
