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
  override statusCode = HTTP_BAD_REQUEST;
  readonly code = CODE_ARGUMENT_NOT_PROVIDED;
}

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  override statusCode = HTTP_BAD_REQUEST;
  readonly code = CODE_ARGUMENT_INVALID;
}

/**
 * Used to indicate that an argument is out of allowed range
 * (for example: incorrect string/array length, number not in allowed min/max range etc)
 *
 * @class ArgumentOutOfRangeException
 * @extends {ExceptionBase}
 */
export class ArgumentOutOfRangeException extends ExceptionBase {
  override statusCode = HTTP_BAD_REQUEST;
  readonly code = CODE_ARGUMENT_OUT_OF_RANGE;
}

/**
 * Used to indicate conflicting entities (usually in the database)
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class ConflictException extends ExceptionBase {
  override statusCode = HTTP_CONFLICT;
  readonly code = CODE_CONFLICT;
}

/**
 * Used to indicate that entity is not found
 *
 * @class NotFoundException
 * @extends {ExceptionBase}
 */
export class NotFoundException extends ExceptionBase {
  static readonly message = "Not found";
  override statusCode = HTTP_NOT_FOUND;
  readonly code = CODE_NOT_FOUND;
}

export class TimeOutException extends ExceptionBase {
  static readonly message = "Timeout";
  override statusCode = HTTP_REQUEST_TIMEOUT;
  readonly code = CODE_TIMEOUT;
}

/**
 * Used to indicate an internal server error that does not fall under all other errors
 *
 * @class InternalServerErrorException
 * @extends {ExceptionBase}
 */
export class InternalServerErrorException extends ExceptionBase {
  override message = "Internal server error";
  override statusCode = HTTP_INTERNAL_SERVER_ERROR;
  readonly code = CODE_INTERNAL_SERVER_ERROR;
}
