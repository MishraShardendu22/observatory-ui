import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/** The class list of a button, for links that must look like one. */
export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(
    "btn",
    `btn-${variant}`,
    size !== "md" && `btn--${size}`,
    className,
  );
}

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Swaps the leading icon for a spinner and disables the button; the label stays so the width does not jump. */
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass(variant, size, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className="btn__spinner" aria-hidden="true" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

export interface ButtonLinkProps extends ComponentPropsWithoutRef<"a"> {
  /** The element or component to render, `next/link` for client navigation. */
  component?: ElementType;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/** A link styled as a button. */
export function ButtonLink({
  component: Component = "a",
  variant = "outline",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Component className={buttonClass(variant, size, className)} {...rest}>
      {leftIcon}
      {children}
      {rightIcon}
    </Component>
  );
}

export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** Required: the button has no visible label. */
  "aria-label": string;
}

/** A 36px square button holding one 16px icon. */
export function IconButton({
  className,
  type = "button",
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button type={type} className={cn("icon-button", className)} {...rest}>
      {children}
    </button>
  );
}
