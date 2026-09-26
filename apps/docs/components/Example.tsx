import type { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

/** A live rendering of a component beside the code that produced it. */
export function Example({
  title,
  children,
  code,
  padded = true,
}: {
  title?: string;
  children: ReactNode;
  code?: string;
  padded?: boolean;
}) {
  return (
    <section className="docs-example">
      {title && <h3 className="docs-example__title">{title}</h3>}
      <div
        className={
          padded
            ? "docs-example__frame"
            : "docs-example__frame docs-example__frame--bare"
        }
      >
        {children}
      </div>
      {code && <CodeBlock code={code} language="tsx" />}
    </section>
  );
}
