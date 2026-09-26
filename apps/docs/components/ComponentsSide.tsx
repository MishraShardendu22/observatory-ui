import Link from "next/link";
import { components, GROUPS } from "@/content/components";

export function ComponentsSide({ current }: { current?: string }) {
  return (
    <nav className="docs-side" aria-label="Components">
      {GROUPS.map((group) => {
        const items = components.filter((c) => c.group === group);
        if (items.length === 0) return null;
        return (
          <div key={group}>
            <div className="docs-side__group">{group}</div>
            {items.map((c) => (
              <Link
                key={c.slug}
                href={`/components/${c.slug}/`}
                aria-current={c.slug === current ? "page" : undefined}
              >
                {c.name}
              </Link>
            ))}
          </div>
        );
      })}
    </nav>
  );
}
