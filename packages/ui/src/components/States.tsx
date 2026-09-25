import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface EmptyStateProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** One primary button. */
  action?: ReactNode;
  /** No dashed panel: for use inside a card. */
  inline?: boolean;
}

/** The placeholder for a list or page with nothing to show. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  inline = false,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      className={cn("empty-state", inline && "empty-state--inline", className)}
      {...rest}
    >
      {icon && <span className="empty-state__icon">{icon}</span>}
      <div className="empty-state__title">{title}</div>
      {description && <p className="empty-state__body">{description}</p>}
      {action}
    </div>
  );
}

export type SpinnerSize = "sm" | "md" | "lg";

/** A ring spinner in the current text colour. */
export function Spinner({
  size = "md",
  className,
  ...rest
}: ComponentPropsWithoutRef<"span"> & { size?: SpinnerSize }) {
  return (
    <span
      className={cn("loader", size !== "md" && `loader--${size}`, className)}
      aria-hidden="true"
      {...rest}
    />
  );
}

export interface LoadingStateProps extends ComponentPropsWithoutRef<"div"> {
  message?: ReactNode;
  size?: SpinnerSize;
}

/** A spinner beside a short message, for a region that is loading. */
export function LoadingState({
  message = "Loading",
  size = "md",
  className,
  ...rest
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "loading-state",
        size === "sm" && "loading-state--sm",
        className,
      )}
      aria-busy="true"
      aria-live="polite"
      {...rest}
    >
      <Spinner size={size} />
      <span>{message}</span>
    </div>
  );
}

export interface SkeletonProps extends ComponentPropsWithoutRef<"div"> {
  width?: number | string;
  height?: number | string;
}

/** A shimmering placeholder in the shape of the content it stands in for. */
export function Skeleton({
  width,
  height = 16,
  className,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={cn("skeleton", className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...rest}
    />
  );
}
