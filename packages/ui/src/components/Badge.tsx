import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cn";

export type BadgeVariant =
  | "success"
  | "error"
  | "running"
  | "warning"
  | "neutral";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
}

/** A status pill with a leading dot and its word. */
export function Badge({
  variant = "neutral",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span className={cn("badge", `badge-${variant}`, className)} {...rest}>
      {children}
    </span>
  );
}

const SUCCESS = new Set([
  "completed",
  "complete",
  "success",
  "successful",
  "succeeded",
  "ok",
  "healthy",
  "ready",
  "active",
  "live",
  "connected",
  "done",
  "passed",
]);
const RUNNING = new Set([
  "running",
  "in_progress",
  "in-progress",
  "pending",
  "queued",
  "building",
  "polling",
  "streaming",
  "starting",
]);
const ERROR = new Set([
  "failed",
  "failure",
  "error",
  "errored",
  "expired",
  "offline",
  "rejected",
  "cancelled",
  "canceled",
]);
const WARNING = new Set([
  "warning",
  "warn",
  "degraded",
  "partial",
  "stale",
  "timeout",
]);

/** The badge variant for a status word from the backup API or the Observatory. */
export function statusVariant(status: string | null | undefined): BadgeVariant {
  const key = (status ?? "").trim().toLowerCase();
  if (SUCCESS.has(key)) return "success";
  if (RUNNING.has(key)) return "running";
  if (ERROR.has(key)) return "error";
  if (WARNING.has(key)) return "warning";
  return "neutral";
}

export interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: string | null | undefined;
}

/** A badge that picks its colour from the status word and shows the word. */
export function StatusBadge({ status, children, ...rest }: StatusBadgeProps) {
  return (
    <Badge variant={statusVariant(status)} {...rest}>
      {children ?? status ?? "unknown"}
    </Badge>
  );
}

/** A plain tag for branches, versions and tool names. */
export function Pill({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span className={cn("pill", className)} {...rest}>
      {children}
    </span>
  );
}
