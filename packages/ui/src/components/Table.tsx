import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cn";

/** Horizontal scrolling for a wide table on narrow screens. */
export function TableWrap({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("table-wrap", className)} {...rest}>
      {children}
    </div>
  );
}

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  /** Keeps a minimum width of 720px inside a TableWrap. */
  wide?: boolean;
}

/**
 * Data rows with uppercase header cells and hairline rules. Give each `<td>`
 * a `data-label` so rows collapse into label/value cards under 640px.
 */
export function Table({
  wide = false,
  className,
  children,
  ...rest
}: TableProps) {
  return (
    <table className={cn("table", wide && "table-wide", className)} {...rest}>
      {children}
    </table>
  );
}
