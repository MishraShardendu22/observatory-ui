import { TrendingDown, TrendingUp } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export type StatTone = "default" | "success" | "danger" | "muted";

export interface StatDelta {
  direction?: "up" | "down" | "flat";
  label: ReactNode;
}

export interface StatCardProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  label: ReactNode;
  value: ReactNode;
  /** Colours the value itself; only when the number is a health signal. */
  tone?: StatTone;
  delta?: StatDelta;
  /** A tile inside a card (bg-200, smaller value) instead of a card of its own. */
  flat?: boolean;
  /** A shorter tile for dense grids. */
  compact?: boolean;
}

/** A KPI tile: an uppercase label, a serif number and an optional delta line. */
export function StatCard({
  label,
  value,
  tone = "default",
  delta,
  flat = false,
  compact = false,
  className,
  children,
  ...rest
}: StatCardProps) {
  return (
    <div
      className={cn(
        flat ? "card--flat stat-card--flat" : "stat-card",
        compact && "stat-card--compact",
        className,
      )}
      {...rest}
    >
      <div className="stat-label">{label}</div>
      <div
        className={cn(
          "stat-value",
          (flat || compact) && "stat-value--md",
          tone !== "default" && `stat-value--${tone}`,
        )}
      >
        {value}
      </div>
      {delta && (
        <div
          className={cn(
            "stat-delta",
            delta.direction === "up" && "stat-delta--up",
            delta.direction === "down" && "stat-delta--down",
          )}
        >
          {delta.direction === "up" && <TrendingUp aria-hidden="true" />}
          {delta.direction === "down" && <TrendingDown aria-hidden="true" />}
          {delta.label}
        </div>
      )}
      {children}
    </div>
  );
}

export interface StatStripItem {
  value: ReactNode;
  label: ReactNode;
}

/** A row of headline numbers separated by hairlines, for a landing hero. */
export function StatStrip({
  items,
  className,
  ...rest
}: ComponentPropsWithoutRef<"div"> & { items: StatStripItem[] }) {
  return (
    <div className={cn("stat-strip", className)} {...rest}>
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: items are static copy without ids
        <div className="stat-strip__item" key={index}>
          <div className="stat-strip__value">{item.value}</div>
          <div className="stat-strip__label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
