import {
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Menu,
} from "lucide-react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../lib/cn";

/*
 * The signed-in app frame: a fixed sidebar on the left, a main column, and
 * a drawer with a top bar under 768px. The sidebar's width comes from
 * --sidebar-width, which <html data-sidebar="collapsed"> narrows to
 * --sidebar-collapsed; set the attribute before first paint so the layout
 * never jumps.
 */

export function AppShell({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("app-layout", className)} {...rest}>
      {children}
    </div>
  );
}

/** The column beside the sidebar: the mobile header and the main content. */
export function AppContent({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("app-content-wrapper", className)} {...rest}>
      {children}
    </div>
  );
}

/** The centred main column (content-max wide). */
export function AppMain({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"main">) {
  return (
    <main className={cn("app-main", className)} {...rest}>
      {children}
    </main>
  );
}

export interface MobileHeaderProps
  extends Omit<ComponentPropsWithoutRef<"header">, "title"> {
  title: ReactNode;
  /** Opens the drawer. */
  onOpenMenu: () => void;
  menuOpen?: boolean;
  /** The id of the Sidebar, for aria-controls. */
  navId?: string;
  /** Content on the right, balancing the menu button. */
  trailing?: ReactNode;
}

/** The 56px bar shown under 768px, with the button that opens the drawer. */
export function MobileHeader({
  title,
  onOpenMenu,
  menuOpen = false,
  navId,
  trailing,
  className,
  ...rest
}: MobileHeaderProps) {
  return (
    <header className={cn("mobile-header", className)} {...rest}>
      <button
        type="button"
        onClick={onOpenMenu}
        className="mobile-menu-btn"
        aria-label="Open navigation menu"
        aria-controls={navId}
        aria-expanded={menuOpen}
      >
        <Menu size={20} aria-hidden="true" />
      </button>
      <span className="mobile-header-title">{title}</span>
      {trailing ?? (
        <span className="mobile-header__spacer" aria-hidden="true" />
      )}
    </header>
  );
}

export interface SidebarOverlayProps {
  open: boolean;
  onClose?: () => void;
}

/** The scrim behind the drawer under 768px. */
export function SidebarOverlay({ open, onClose }: SidebarOverlayProps) {
  return (
    <div
      className={cn("sidebar-overlay", open && "mobile-open")}
      onClick={onClose}
      aria-hidden="true"
    />
  );
}

export interface SidebarProps extends ComponentPropsWithoutRef<"aside"> {
  /** Shown as the drawer under 768px. */
  open?: boolean;
}

/** The fixed sidebar. Give it an id and aria-label; MobileHeader points at the id. */
export function Sidebar({
  open = false,
  className,
  children,
  ...rest
}: SidebarProps) {
  return (
    <aside
      className={cn("global-sidebar", open && "mobile-open", className)}
      {...rest}
    >
      {children}
    </aside>
  );
}

export interface SidebarHeaderProps extends ComponentPropsWithoutRef<"div"> {
  collapsed?: boolean;
}

export function SidebarHeader({
  collapsed = false,
  className,
  children,
  ...rest
}: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "global-sidebar-header",
        collapsed && "global-sidebar-header--collapsed",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface SidebarBrandProps extends ComponentPropsWithoutRef<"a"> {
  component?: ElementType;
  /** The 28px tile, usually the product mark. */
  tile?: ReactNode;
}

export function SidebarBrand({
  component: Component = "a",
  tile,
  className,
  children,
  ...rest
}: SidebarBrandProps) {
  return (
    <Component className={cn("global-sidebar-brand", className)} {...rest}>
      {tile && <span className="global-sidebar-brand-tile">{tile}</span>}
      {children}
    </Component>
  );
}

export interface SidebarToggleProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onToggle"> {
  collapsed: boolean;
  onToggle: () => void;
}

export function SidebarToggle({
  collapsed,
  onToggle,
  className,
  ...rest
}: SidebarToggleProps) {
  const label = collapsed ? "Expand sidebar" : "Collapse navigation";
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn("global-sidebar-toggle-btn", className)}
      aria-label={label}
      title={label}
      {...rest}
    >
      {collapsed ? (
        <ChevronsRight size={16} aria-hidden="true" />
      ) : (
        <ChevronsLeft size={16} aria-hidden="true" />
      )}
    </button>
  );
}

export function SidebarNav({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav className={cn("tree-nav", className)} {...rest}>
      {children}
    </nav>
  );
}

/** An uppercase label between groups of items. */
export function SidebarSection({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("tree-section", className)} {...rest}>
      {children}
    </div>
  );
}

export function SidebarFooter({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("global-sidebar-footer", className)} {...rest}>
      {children}
    </div>
  );
}

export interface TreeNodeProps
  extends Omit<ComponentPropsWithoutRef<"a">, "title"> {
  /** `a` with an href, `button` without one; pass `next/link` for client navigation. */
  component?: ElementType;
  icon?: ReactNode;
  label: ReactNode;
  active?: boolean;
  /** Icon only, with the label in a tooltip on hover. */
  collapsed?: boolean;
  /** Tooltip text when collapsed; the label by default. */
  tooltip?: ReactNode;
  /** A folder row: shows a chevron in this state. */
  chevron?: "open" | "closed";
  /** A count, a badge or hover actions after the label. */
  trailing?: ReactNode;
  /** Opens in a new tab. */
  external?: boolean;
  disabled?: boolean;
  /** Colours the row in the accent, for a primary action such as New chat. */
  accent?: boolean;
}

/** One row of the sidebar: a link, a folder toggle or an action. */
export function TreeNode({
  component,
  href,
  icon,
  label,
  active = false,
  collapsed = false,
  tooltip,
  chevron,
  trailing,
  external = false,
  disabled = false,
  accent = false,
  className,
  ...rest
}: TreeNodeProps) {
  const Component: ElementType = component ?? (href ? "a" : "button");
  const isButton = Component === "button";
  const node = (
    <Component
      className={cn(
        "tree-node",
        active && "active",
        collapsed && "tree-node--collapsed",
        accent && "tree-node--accent",
        className,
      )}
      href={href}
      aria-current={active ? "page" : undefined}
      {...(isButton ? { type: "button", disabled } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(disabled && !isButton ? { "aria-disabled": true } : {})}
      {...rest}
    >
      {chevron && !collapsed && (
        <span
          className={cn("tree-node-chevron", chevron === "open" && "open")}
          aria-hidden="true"
        >
          {chevron === "open" ? (
            <ChevronDown size={14} />
          ) : (
            <ChevronRight size={14} />
          )}
        </span>
      )}
      {icon && <span className="tree-node-icon">{icon}</span>}
      {!collapsed && <span className="tree-node-label">{label}</span>}
      {!collapsed && trailing}
    </Component>
  );
  if (!collapsed) return node;
  return (
    <div className="sidebar-tooltip-wrapper">
      {node}
      <span className="sidebar-tooltip">{tooltip ?? label}</span>
    </div>
  );
}

/** The indented list under an open folder row. */
export function TreeChildren({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("tree-children-container", className)} {...rest}>
      {children}
    </div>
  );
}

/** A folder row and its children as one block. */
export function TreeGroup({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("tree-node-wrapper", className)} {...rest}>
      {children}
    </div>
  );
}
