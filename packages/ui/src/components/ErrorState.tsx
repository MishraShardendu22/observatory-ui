"use client";

import { AlertTriangle } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";

export interface ErrorStateProps extends ComponentPropsWithoutRef<"div"> {
  message: ReactNode;
  /** Shows a Try again button. */
  retry?: () => void;
  retryLabel?: ReactNode;
}

/** A centred error message with an optional retry, for a region that failed to load. */
export function ErrorState({
  message,
  retry,
  retryLabel = "Try again",
  className,
  ...rest
}: ErrorStateProps) {
  return (
    <div className={cn("error-state", className)} {...rest}>
      <div className="error-state__message" role="alert">
        <AlertTriangle aria-hidden="true" />
        <span>{message}</span>
      </div>
      {retry && (
        <Button variant="outline" size="sm" onClick={retry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
