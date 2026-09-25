import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface FieldProps extends ComponentPropsWithoutRef<"div"> {
  label: ReactNode;
  /** The id of the control, so the label focuses it. */
  htmlFor?: string;
  hint?: ReactNode;
  /** Replaces the hint and turns the control's border danger. */
  error?: ReactNode;
}

/** A label, a control and one line of hint or error. */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
  ...rest
}: FieldProps) {
  return (
    <div
      className={cn("field", error ? "field--error" : undefined, className)}
      {...rest}
    >
      <label className="field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <span className="field__error">{error}</span>
      ) : hint ? (
        <span className="field__hint">{hint}</span>
      ) : null}
    </div>
  );
}

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  /** Monospace, for repository names, cron expressions and ids. */
  mono?: boolean;
}

export function Input({ mono = false, className, ...rest }: InputProps) {
  return (
    <input
      className={cn("input", mono && "input--mono", className)}
      {...rest}
    />
  );
}

export function Textarea({
  className,
  ...rest
}: ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cn("textarea", className)} {...rest} />;
}

export function Select({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"select">) {
  return (
    <select className={cn("select", className)} {...rest}>
      {children}
    </select>
  );
}

export interface CheckboxProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  label: ReactNode;
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={cn("checkbox", className)}>
      <input type="checkbox" {...rest} />
      <span>{label}</span>
    </label>
  );
}
