import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ApiErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
              <h2 className="text-lg">There was an error!</h2>
              <Button onClick={() => resetErrorBoundary()}>Try again</Button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}