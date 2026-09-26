import { Kicker, NavCard } from "@mishrashardendu22/observatory-ui";
import { Blocks } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ComponentsSide } from "@/components/ComponentsSide";
import { components, GROUPS } from "@/content/components";

export const metadata: Metadata = { title: "Components" };

export default function ComponentsIndex() {
  return (
    <div className="docs-components">
      <ComponentsSide />
      <div className="docs-page docs-prose">
        <div>
          <Kicker>Library</Kicker>
          <h1>Components</h1>
          <p className="docs-lede">
            Every component renders the class names of <code>styles.css</code>,
            so markup that already uses <code>.btn</code>, <code>.card</code> or{" "}
            <code>.badge-success</code> keeps working without them. Each page
            shows the component live, beside the code that produced it, with the
            rules for using it.
          </p>
        </div>
        {GROUPS.map((group) => {
          const items = components.filter((c) => c.group === group);
          if (items.length === 0) return null;
          return (
            <section key={group} className="docs-section">
              <h2>{group}</h2>
              <div className="metric-grid metric-grid--two">
                {items.map((c) => (
                  <NavCard
                    key={c.slug}
                    component={Link}
                    href={`/components/${c.slug}/`}
                    icon={<Blocks aria-hidden="true" />}
                    title={c.name}
                    body={c.summary}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
