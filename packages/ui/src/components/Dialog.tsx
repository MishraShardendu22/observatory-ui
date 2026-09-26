"use client";

import { X } from "lucide-react";
import { type ReactNode, useEffect, useId } from "react";
import { cn } from "../lib/cn";
import { IconButton } from "./Button";

export interface DialogProps {
  open: boolean;
  /** Called on the close button, the Escape key and a click on the scrim. */
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Right-aligned buttons; the primary one last. */
  actions?: ReactNode;
  size?: "sm" | "md" | "lg";
  /** An amber border for a confirmation the agent is waiting on. */
  accent?: boolean;
  /** Hides the close button (a decision that must be made). */
  dismissable?: boolean;
  className?: string;
}

/** A modal panel over a scrim, for confirmations and short forms. */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = "md",
  accent = false,
  dismissable = true,
  className,
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && dismissable) onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, dismissable, onClose]);

  if (!open) return null;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: the scrim closes the dialog on a direct click
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape is handled on the document above
    <div
      className="dialog-overlay"
      onClick={(event) => {
        if (dismissable && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          "dialog",
          `dialog--${size}`,
          accent && "dialog--accent",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
      >
        <div className="dialog__head">
          <h2 className="dialog__title" id={titleId}>
            {title}
          </h2>
          {dismissable && (
            <IconButton
              aria-label="Close"
              onClick={onClose}
              className="dialog__close"
            >
              <X aria-hidden="true" />
            </IconButton>
          )}
        </div>
        {description && (
          <p className="dialog__description" id={descriptionId}>
            {description}
          </p>
        )}
        {children && <div className="dialog__body">{children}</div>}
        {actions && <div className="dialog__actions">{actions}</div>}
      </div>
    </div>
  );
}
