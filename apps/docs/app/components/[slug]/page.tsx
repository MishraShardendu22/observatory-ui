import { Kicker } from "@mishrashardendu22/observatory-ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComponentsSide } from "@/components/ComponentsSide";
import { Example } from "@/components/Example";
import { components, findComponent } from "@/content/components";

export const dynamicParams = false;

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = findComponent(slug);
  return { title: doc?.name ?? "Component", description: doc?.summary };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = findComponent(slug);
  if (!doc) notFound();

  return (
    <div className="docs-components">
      <ComponentsSide current={doc.slug} />
      <div className="docs-page docs-prose">
        <div>
          <Kicker>{doc.group}</Kicker>
          <h1>{doc.name}</h1>
          <p className="docs-lede">{doc.summary}</p>
        </div>

        <section className="docs-section">
          <h2>Examples</h2>
          {doc.examples.map((example) => (
            <Example
              key={example.title}
              title={example.title}
              code={example.code}
              padded={!example.bare}
            >
              {example.render()}
            </Example>
          ))}
        </section>

        <section className="docs-section">
          <h2>Guidelines</h2>
          <ul className="docs-guidelines">
            {doc.guidelines.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>

        <section className="docs-section">
          <h2>Props</h2>
          <table className="docs-props">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              {doc.props.map((prop) => (
                <tr key={prop.name}>
                  <td>{prop.name}</td>
                  <td>{prop.type}</td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
