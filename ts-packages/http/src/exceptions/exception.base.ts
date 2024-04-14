export interface NormalizedException {
  message: string;
  code: string;
  statusCode: number;
  stack?: string;
  cause?: string;
  /**
   * ^ Consider adding optional `metadata` object to
   * exceptions (if language doesn't support anything
   * similar by default) and pass some useful technical
   * information about the exception when throwing.
   * This will make debugging easier.
   */
  metadata?: Record<string, any>;
}

export interface HttpExceptionOptions {
  /**
   * @description origin cause of the error
   */
  cause?: unknown;
  description?: string;
}

export class ExceptionBase extends Error {
  override cause?: unknown;

  /**
   * @param {string} exMessage
   * @param {number} status
   * @param {HttpExceptionOptions} [options={}]
   * **BE CAREFUL** not to include sensitive info in 'metadata'
   * to prevent leaks since all exception's data will end up
   * in application's log files. Only include non-sensitive
   * info that may help with debugging.
   */
  constructor(
    private readonly exMessage: string | Record<string, any>,
    private readonly status: number,
    readonly options?: HttpExceptionOptions,
  ) {
    super();
  }

  toJSON(): NormalizedException {
    return {
      message: this.exMessage,
      statusCode: this.statusCode,
      code: this.code,
      stack: this.stack,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}
