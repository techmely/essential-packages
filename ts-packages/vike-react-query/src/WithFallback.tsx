import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React, { type ComponentType, type ReactNode, Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

type RetryOptions = { retryQuery?: boolean };
type RetryFn = (options?: RetryOptions) => void;

type ErrorFallbackProps = {
  error: { message: string };
  retry: RetryFn;
};

type Loading<T> = ComponentType<T> | ReactNode;
type ErrorComp<T> = ComponentType<T & ErrorFallbackProps> | ReactNode;

type WithFallbackOptions<T> = {
  Loading?: Loading<T>;
  ErrorComp?: ErrorComp<T>;
};

export function withFallback<T extends object = Record<string, never>>(
  Component: ComponentType<T>,
  options?: WithFallbackOptions<T>,
): ComponentType<T> {
  const ComponentWithFallback = (cProps: T) => {
    const LoadingComp =
      typeof options?.Loading === "function" ? <options.Loading {...cProps} /> : options?.Loading;
    const ErrorComp = options?.ErrorComp;
    if (ErrorComp) {
      return (
        <Suspense fallback={LoadingComp}>
          <QueryErrorResetBoundary>
            {({ reset }) => {
              const createRetry =
                (resetErrorBoundary: FallbackProps["resetErrorBoundary"]): RetryFn =>
                (options = {}) => {
                  const { retryQuery = true } = options;
                  if (retryQuery) {
                    reset();
                  }
                  resetErrorBoundary();
                };
              const createError = (originalError: FallbackProps["error"]) => {
                const message = getErrorMessage(originalError);
                const error = { message };
                if (typeof originalError === "object") {
                  Object.assign(error, originalError);
                }
                return error;
              };

              return (
                <ErrorBoundary
                  fallbackRender={({ error, resetErrorBoundary }) =>
                    typeof ErrorComp === "function" ? (
                      <ErrorComp
                        {...cProps}
                        retry={createRetry(resetErrorBoundary)}
                        error={createError(error)}
                      />
                    ) : (
                      ErrorComp
                    )
                  }
                >
                  <Component {...cProps} />
                </ErrorBoundary>
              );
            }}
          </QueryErrorResetBoundary>
        </Suspense>
      );
    }
    return (
      <Suspense fallback={LoadingComp}>
        <Component {...cProps} />
      </Suspense>
    );
  };
  ComponentWithFallback.displayName = `withFallback-${
    Component.displayName || ComponentWithFallback.name
  }`;
  return ComponentWithFallback;
}

function getErrorMessage(error: unknown) {
  if (error && error instanceof Error) {
    return error.message;
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unknown error";
}
