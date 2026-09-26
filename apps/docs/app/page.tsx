import {
  Badge,
  ButtonLink,
  Card,
  GitHubIcon,
  Kicker,
  NavCard,
  StatCard,
} from "@mishrashardendu22/observatory-ui";
import { ArrowRight, Blocks, Download, Palette } from "lucide-react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { REPO_URL, TOKENS_TARBALL, UI_TARBALL, VERSION } from "@/content/site";

export default function HomePage() {
  return (
    <div className="docs-page">
      <section className="docs-hero">
        <div>
          <Kicker>Design system · v{VERSION}</Kicker>
          <h1 className="docs-hero__title">
            A warm, editorial instrument panel with one amber <em>accent</em>.
          </h1>
          <p className="docs-hero__lede">
            Observatory is the design system of the GitHub Backup Automation
            System: tokens as CSS custom properties and a set of React
            components, released as two packages any web app installs from a
            GitHub release. Dark by default, light when the device asks for it.
          </p>
          <div className="docs-hero__actions">
            <ButtonLink
              component={Link}
              href="/install/"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight aria-hidden="true" />}
            >
              Install
            </ButtonLink>
            <ButtonLink
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              size="lg"
              leftIcon={<GitHubIcon />}
            >
              Source
            </ButtonLink>
          </div>
        </div>
        <Card
          className="docs-hero__sample"
          aria-label="Sample of the components"
        >
          <div className="card__head">
            <div>
              <Kicker>Latest run</Kicker>
              <h2 style={{ fontSize: 26, lineHeight: "32px", marginTop: 6 }}>
                Backup run #1,240
              </h2>
            </div>
            <Badge variant="success">Completed</Badge>
          </div>
          <div className="metric-grid metric-grid--two">
            <StatCard flat label="Repositories" value={42} />
            <StatCard flat label="Success rate" tone="success" value="99.9%" />
          </div>
        </Card>
      </section>

      <section className="docs-section">
        <CodeBlock
          code={`pnpm add \\
  ${TOKENS_TARBALL} \\
  ${UI_TARBALL}`}
        />
      </section>

      <section className="docs-section">
        <div className="metric-grid metric-grid--three">
          <NavCard
            component={Link}
            href="/install/"
            icon={<Download aria-hidden="true" />}
            title="Install"
            body="Add the two packages from a release, load the stylesheet, transpile the components in Next.js."
          />
          <NavCard
            component={Link}
            href="/tokens/"
            icon={<Palette aria-hidden="true" />}
            title="Tokens"
            body="Every colour in both themes, the type scale, spacing, radii, shadows and layout, with the rule for each."
          />
          <NavCard
            component={Link}
            href="/components/"
            icon={<Blocks aria-hidden="true" />}
            title="Components"
            body="Buttons, cards, stat cards, badges, forms, tables, notices and page chrome, each rendered live beside its code."
          />
        </div>
      </section>

      <section className="docs-section docs-prose">
        <Kicker>Principles</Kicker>
        <h2>Five rules that shape every screen.</h2>
        <ul>
          <li>
            <strong>Calm over clever.</strong> Big serif statements, lots of
            space, small quiet UI. Motion only confirms an action.
          </li>
          <li>
            <strong>One accent.</strong> Amber is the only colour that asks for
            attention. Status colours describe; they do not promote.
          </li>
          <li>
            <strong>Borders, not shadows.</strong> Surfaces are separated by a
            1px hairline on a slightly lighter ground. Shadows are for things
            that float.
          </li>
          <li>
            <strong>Numbers are the hero.</strong> Counts and rates are set in
            the serif at 36px; everything around them is small and secondary.
          </li>
          <li>
            <strong>Hover never moves.</strong> Hover changes colour, border or
            background only. Press scales to 0.98.
          </li>
        </ul>
      </section>
    </div>
  );
}
