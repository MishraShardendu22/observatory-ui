"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface SegmentedOption<T extends string> {
  value: T;
  label: ReactNode;
}

export interface SegmentedProps<T extends string> {
  options: ReadonlyArray<SegmentedOption<T>>;
  value: T;
  onChange: (value: T) => void;
  /** Names the group for assistive technology. */
  "aria-label": string;
  className?: string;
}

/** A controlled segmented control for two to five options. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
  ...rest
}: SegmentedProps<T>) {
  return (
    <fieldset
      aria-label={rest["aria-label"]}
      className={cn("segmented", className)}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn("segmented-btn", option.value === value && "active")}
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  );
}
