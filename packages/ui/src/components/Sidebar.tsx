"use client";

import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { cn } from "../lib/cn";

/*
 * The width at which styles.css turns the sidebar into an off-screen drawer
 * (`@media (max-width: 768px)` on .global-sidebar). Keep the two in step.
 */
const DRAWER_QUERY = "(max-width: 768px)";

function subscribeToDrawerQuery(onChange: () => void) {
  const query = window.matchMedia(DRAWER_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const isDrawerWidth = () => window.matchMedia(DRAWER_QUERY).matches;
// The server and the hydration pass render the wide layout; the client
// re-checks right after.
const isDrawerWidthOnServer = () => false;

export interface SidebarProps extends ComponentPropsWithoutRef<"aside"> {
  /** Shown as the drawer under 768px. */
  open?: boolean;
}

/**
 * The fixed sidebar. Give it an id and aria-label; MobileHeader points at the id.
 *
 * While it is a closed drawer (768px and narrower, `open` false) it is
 * `inert` and `aria-hidden`, so Tab and screen readers skip the off-screen
 * links. On wide screens, or once opened, both are removed.
 */
export function Sidebar({
  open = false,
  className,
  children,
  ...rest
}: SidebarProps) {
  const ref = useRef<HTMLElement>(null);
  const drawer = useSyncExternalStore(
    subscribeToDrawerQuery,
    isDrawerWidth,
    isDrawerWidthOnServer,
  );
  const hidden = drawer && !open;

  // Set as a DOM property rather than a JSX prop: React 18 does not know the
  // `inert` attribute, and the package supports React 18 and 19.
  useEffect(() => {
    if (ref.current) ref.current.inert = hidden;
  }, [hidden]);

  return (
    <aside
      ref={ref}
      className={cn("global-sidebar", open && "mobile-open", className)}
      {...rest}
      aria-hidden={hidden ? true : rest["aria-hidden"]}
    >
      {children}
    </aside>
  );
}
