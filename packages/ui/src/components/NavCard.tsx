import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface NavCardProps
  extends Omit<ComponentPropsWithoutRef<"a">, "title"> {
  /** `a` by default; pass `next/link` for client navigation. */
  component?: ElementType;
  /** A 20px functional icon in the amber tile. */
  icon: ReactNode;
  kicker?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
}

/** A linking card with an amber icon tile, a serif title and one sentence. The whole card is the link. */
export function NavCard({
  component: Component = "a",
  icon,
  kicker,
  title,
  body,
  className,
  ...rest
}: NavCardProps) {
  return (
    <Component className={cn("card nav-card", className)} {...rest}>
      <span className="nav-card__icon">{icon}</span>
      <span className="nav-card__text">
        {kicker && <span className="kicker kicker--muted">{kicker}</span>}
        <span className="nav-card__title">{title}</span>
        {body && <span className="nav-card__body">{body}</span>}
      </span>
    </Component>
  );
}
