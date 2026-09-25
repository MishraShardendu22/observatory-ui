import { AlertTriangle, CircleCheck, CircleX, Info } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export type NoticeVariant =
  | "neutral"
  | "success"
  | "error"
  | "warning"
  | "info";

export interface NoticeProps
  extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  variant?: NoticeVariant;
  title?: ReactNode;
  /** Replaces the variant's default icon; `null` hides it. */
  icon?: ReactNode;
  /** At most one small button. */
  action?: ReactNode;
}

const ICONS: Record<NoticeVariant, ReactNode> = {
  neutral: null,
  success: <CircleCheck aria-hidden="true" />,
  error: <CircleX aria-hidden="true" />,
  warning: <AlertTriangle aria-hidden="true" />,
  info: <Info aria-hidden="true" />,
};

/** An inline message with an icon, a bold title, one sentence and an optional action. */
export function Notice({
  variant = "neutral",
  title,
  icon,
  action,
  className,
  children,
  role,
  ...rest
}: NoticeProps) {
  const shownIcon = icon === undefined ? ICONS[variant] : icon;
  return (
    <div
      className={cn(
        "notice",
        variant !== "neutral" && `notice-${variant}`,
        className,
      )}
      role={role ?? (variant === "error" ? "alert" : "status")}
      {...rest}
    >
      {shownIcon}
      <div className="notice__text">
        {title && <div className="notice__title">{title}</div>}
        {children && <div className="notice__body">{children}</div>}
      </div>
      {action && <div className="notice__action">{action}</div>}
    </div>
  );
}
