import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../lib/cn";

export interface TabsProps extends ComponentPropsWithoutRef<"nav"> {
  /** Names the set for assistive technology. */
  "aria-label": string;
}

/** Underline tabs that switch between sibling pages of one section. */
export function Tabs({ className, children, ...rest }: TabsProps) {
  return (
    <nav className={cn("tabs", className)} {...rest}>
      {children}
    </nav>
  );
}

export interface TabProps extends ComponentPropsWithoutRef<"a"> {
  /** `a` by default; pass `next/link` for client navigation, `button` for in-page tabs. */
  component?: ElementType;
  active?: boolean;
}

export function Tab({
  component: Component = "a",
  active = false,
  className,
  children,
  ...rest
}: TabProps) {
  const isButton = Component === "button";
  return (
    <Component
      className={cn("tab", active && "active", className)}
      aria-current={active ? "page" : undefined}
      {...(isButton ? { type: "button", "aria-pressed": active } : {})}
      {...rest}
    >
      {children}
    </Component>
  );
}
