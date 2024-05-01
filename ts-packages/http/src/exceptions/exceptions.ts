import type { HttpFetchOptions } from "../http.types";
import { ExceptionBase } from "./exception.base";
import {
  CODE_ARGUMENT_INVALID,
  CODE_ARGUMENT_NOT_PROVIDED,
  CODE_ARGUMENT_OUT_OF_RANGE,
  CODE_CONFLICT,
  CODE_INTERNAL_SERVER_ERROR,
  CODE_NOT_FOUND,
  CODE_TIMEOUT,
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
  HTTP_REQUEST_TIMEOUT,
} from "./exception.codes";

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {ExceptionBase}
 */
export class ArgumentNotProvidedException extends ExceptionBase {
  constructor(customMessage?: string) {
    super(customMessage || "Argument not provided", HTTP_BAD_REQUEST, CODE_ARGUMENT_NOT_PROVIDED);
  }
}

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  constructor(customMessage?: string) {
    super(customMessage || "Argument invalid", HTTP_BAD_REQUEST, CODE_ARGUMENT_INVALID);
  }
}

/**
 * Used to indicate that an argument is out of allowed range
 * (for example: incorrect string/array length, number not in allowed min/max range etc)
 *
 * @class ArgumentOutOfRangeException
 * @extends {ExceptionBase}
 */
export class ArgumentOutOfRangeException extends ExceptionBase {
  constructor(customMessage?: string) {
    super(customMessage || "Argument out of range", HTTP_BAD_REQUEST, CODE_ARGUMENT_OUT_OF_RANGE);
  }
}

/**
 * Used to indicate conflicting entities (usually in the database)
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class ConflictException extends ExceptionBase {
  constructor(customMessage?: string) {
    super(customMessage || "Conflict", HTTP_CONFLICT, CODE_CONFLICT);
  }
}

/**
 * Used to indicate that entity is not found
 *
 * @class NotFoundException
 * @extends {ExceptionBase}
 */
export class NotFoundException extends ExceptionBase {
  constructor(customMessage?: string) {
    super(customMessage || "Not found", HTTP_NOT_FOUND, CODE_NOT_FOUND);
  }
}

export class TimeOutException extends ExceptionBase {
  constructor(customMessage?: string) {
    super(customMessage || "Request timeout", HTTP_REQUEST_TIMEOUT, CODE_TIMEOUT);
  }
}

/**
 * Used to indicate an internal server error that does not fall under all other errors
 *
 * @class InternalServerErrorException
 * @extends {ExceptionBase}
 */
export class InternalServerErrorException extends ExceptionBase {
  constructor(customMessage?: string) {
    super(
      customMessage || "Internal server error",
      HTTP_INTERNAL_SERVER_ERROR,
      CODE_INTERNAL_SERVER_ERROR,
    );
  }
}

export class HttpError extends ExceptionBase {
  response: Response;
  request: Request;
  options: HttpFetchOptions;

  constructor(response: Response, request: Request, options: HttpFetchOptions) {
    const message = response.statusText;
    super(message, response.status, "", options?.metadata);
    this.name = "HttpApiError";
    this.request = request;
    this.response = response;
    this.options = options;
  }
}
