import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../lib/cn";

export type CardVariant = "default" | "flat" | "table" | "hero";

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  /** `section` by default; `div`, `article` or `li` where the markup needs it. */
  as?: ElementType;
  variant?: CardVariant;
  /** The one highlighted panel on a page (amber border and glow). */
  glow?: boolean;
}

export function Card({
  as: Component = "section",
  variant = "default",
  glow = false,
  className,
  children,
  ...rest
}: CardProps) {
  const variantClass =
    variant === "flat"
      ? "card--flat"
      : variant === "table"
        ? "card card--table"
        : variant === "hero"
          ? "card card--hero"
          : "card";
  return (
    <Component
      className={cn(variantClass, glow && "card--glow", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function CardHead({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("card__head", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("card__title", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardMeta({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("card__meta", className)} {...rest}>
      {children}
    </div>
  );
}
