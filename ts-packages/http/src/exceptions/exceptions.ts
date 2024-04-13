import { ExceptionBase } from "./exception.base";
import {
  ARGUMENT_INVALID,
  ARGUMENT_NOT_PROVIDED,
  ARGUMENT_OUT_OF_RANGE,
  CONFLICT,
  HTTP_BAD_REQUEST,
  HTTP_CONFLICT,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "./exception.codes";

/**
 * Used to indicate that an argument was not provided (is empty object/array, null of undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {ExceptionBase}
 */
export class ArgumentNotProvidedException extends ExceptionBase {
  override statusCode = HTTP_BAD_REQUEST;
  readonly code = ARGUMENT_NOT_PROVIDED;
}

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  override statusCode = HTTP_BAD_REQUEST;
  readonly code = ARGUMENT_INVALID;
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
  readonly code = ARGUMENT_OUT_OF_RANGE;
}

/**
 * Used to indicate conflicting entities (usually in the database)
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class ConflictException extends ExceptionBase {
  override statusCode = HTTP_CONFLICT;
  readonly code = CONFLICT;
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
  readonly code = NOT_FOUND;
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

  readonly code = INTERNAL_SERVER_ERROR;
}
