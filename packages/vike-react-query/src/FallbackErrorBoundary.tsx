import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { nodeENV } from "@techmely/utils";
import React, { type CSSProperties, type FC, type PropsWithChildren } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

const pageStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ffe1e3",
  padding: 12,
};

const errorTextStyle: CSSProperties = {
  marginBlockEnd: 16,
  fontSize: 20,
  fontWeight: 500,
  color: "#f44250",
};

const buttonStyle: CSSProperties = {
  fontSize: 18,
  fontWeight: 500,
  outline: 0,
  border: 0,
  color: "#272727",
  boxShadow: "0px 1px 2px 0px #ffc5c5",
  backgroundColor: "#fff",
  paddingBlock: "8px 12px",
  borderRadius: 16,
  cursor: "pointer",
};

const Fallback: FC<FallbackProps> = ({ resetErrorBoundary, error }) => {
  return (
    <div style={pageStyle}>
      <div style={errorTextStyle}>There was an error.</div>
      <button type="button" style={buttonStyle} onClick={() => resetErrorBoundary()}>
        Try again
      </button>
      {nodeENV === "development" && <pre>{getErrorStack(error)}</pre>}
    </div>
  );
};

const FallbackErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {nodeENV === "development" ? (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={Fallback}>
              {children}
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      ) : (
        children
      )}
    </>
  );
};

function getErrorStack(error: unknown) {
  if (error && error instanceof Error) {
    return error.stack;
  }

  return "";
}

export default FallbackErrorBoundary;
