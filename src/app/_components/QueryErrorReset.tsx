"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  children: ReactNode;
  message: string;
};

const QueryErrorReset = ({ children, message }: Props) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              <h2>{message}</h2>
              <button
                onClick={
                  // Attempt to recover by trying to re-render the segment
                  () => resetErrorBoundary()
                }
              >
                다시 시도
              </button>
            </div>
          )}
          onReset={reset}
          onError={() => {}}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default QueryErrorReset;
