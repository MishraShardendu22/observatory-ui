import type { ComponentPropsWithoutRef } from "react";

export interface ObservatoryMarkProps extends ComponentPropsWithoutRef<"svg"> {
  size?: number | string;
}

/** The product mark as one ink: a disc, the front arc of its ring, one tile. Painted with currentColor. */
export function ObservatoryMark({ size = 16, ...props }: ObservatoryMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="31" cy="31" r="17" fill="currentColor" />
      <path
        d="M8 44c6 6 24 8 39-1 7-4.3 12-9.6 13-14.5"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <rect
        x="49"
        y="11"
        width="9"
        height="9"
        rx="2.4"
        transform="rotate(-24 53.5 15.5)"
        fill="currentColor"
      />
    </svg>
  );
}
