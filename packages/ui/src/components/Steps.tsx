import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface Step {
  title: ReactNode;
  body?: ReactNode;
  /** Fills the number with the accent. */
  done?: boolean;
}

export interface StepsProps extends ComponentPropsWithoutRef<"ol"> {
  steps: Step[];
}

/** A numbered vertical list with a connector line, three or four steps. */
export function Steps({ steps, className, ...rest }: StepsProps) {
  return (
    <ol className={cn("steps", className)} {...rest}>
      {steps.map((step, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: steps are ordered static copy
        <li className={cn("step", step.done && "step--done")} key={index}>
          <div className="step__num" aria-hidden="true">
            {index + 1}
          </div>
          <div>
            <div className="step__title">{step.title}</div>
            {step.body && <p className="step__body">{step.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
