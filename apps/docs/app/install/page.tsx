import { Kicker, Notice } from "@mishrashardendu22/observatory-ui";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { REPO_URL, TOKENS_TARBALL, UI_TARBALL, VERSION } from "@/content/site";

export const metadata: Metadata = { title: "Install" };

export default function InstallPage() {
  return (
    <div className="docs-page docs-prose">
      <Kicker>Getting started</Kicker>
      <h1>Install</h1>
      <p className="docs-lede">
        Two packages, installed from a GitHub release with no registry token.
        Everything below assumes pnpm and a Next.js app, but the tokens are
        plain CSS and the components are plain React.
      </p>

      <h2>1. Add the packages</h2>
      <p>
        Every <code>v*</code> tag of the repository attaches both tarballs to a
        release. Point pnpm at them:
      </p>
      <CodeBlock
        code={`pnpm add \\
  ${TOKENS_TARBALL} \\
  ${UI_TARBALL}`}
      />
      <p>
        Once a release is also published to npm, the short form works and the
        version follows semver:
      </p>
      <CodeBlock code="pnpm add @mishrashardendu22/observatory-tokens @mishrashardendu22/observatory-ui" />

      <h2>2. Load the styles</h2>
      <p>
        Tokens first, then the components' stylesheet, then your own. With
        Tailwind v4, also import <code>theme.css</code> so utilities such as{" "}
        <code>bg-bg-100</code>, <code>text-ink-muted</code> and{" "}
        <code>rounded-lg</code> resolve to the tokens.
      </p>
      <CodeBlock
        language="css"
        code={`/* app/globals.css */
@import "tailwindcss";
@import "@mishrashardendu22/observatory-tokens/tokens.css";
@import "@mishrashardendu22/observatory-tokens/theme.css";
@import "@mishrashardendu22/observatory-ui/styles.css";`}
      />

      <h2>3. Transpile the components</h2>
      <p>
        The ui package ships TypeScript source rather than a build, so Next.js
        compiles it with the app. Nothing to configure for Vite.
      </p>
      <CodeBlock
        language="ts"
        code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@mishrashardendu22/observatory-ui"],
};

export default nextConfig;`}
      />

      <h2>4. Use a component</h2>
      <CodeBlock
        language="tsx"
        code={`import Link from "next/link";
import { ButtonLink, PageHeader, StatCard, StatusBadge } from "@mishrashardendu22/observatory-ui";

export default function Page() {
  return (
    <div className="page">
      <PageHeader
        kicker="Backup operations"
        title={<>System <em>Status</em></>}
        subtitle="Runs, repository health and storage, as the worker reports them."
        actions={<StatusBadge status="completed" />}
      />
      <div className="metric-grid metric-grid--four">
        <StatCard label="Repositories" value={42} delta={{ direction: "up", label: "+3 this month" }} />
        <StatCard label="Success rate" value="99.9%" tone="success" />
      </div>
      <ButtonLink component={Link} href="/backups" variant="outline">View history</ButtonLink>
    </div>
  );
}`}
      />

      <h2>5. Fonts</h2>
      <p>
        The tokens name Instrument Serif, Inter and IBM Plex Mono, all hosted on
        Google Fonts. An app that self-hosts them with <code>next/font</code>{" "}
        points the three stacks at its own variables after the import:
      </p>
      <CodeBlock
        language="css"
        code={`:root {
  --font-serif: var(--font-heading), "Instrument Serif", Georgia, serif;
  --font-sans: var(--font-body), Inter, system-ui, sans-serif;
  --font-mono: var(--font-mono-var), "IBM Plex Mono", Menlo, monospace;
}`}
      />

      <h2>6. Theme</h2>
      <p>
        Dark is the default. When the device prefers light and the page sets no{" "}
        <code>data-theme</code>, the light values apply. There is no toggle, no
        provider and no stored preference. To pin a page:
      </p>
      <CodeBlock language="html" code={`<html data-theme="dark">`} />
      <Notice variant="info" title="Every colour has both values">
        A new token is added with a dark and a light value, each checked at
        4.5:1 on the grounds its usage note names.
      </Notice>

      <h2>7. Tokens outside CSS</h2>
      <p>
        Charts, canvases and a React Native app read the same values from the
        typed object. Chart libraries take the CSS variable references so the
        series follow the theme.
      </p>
      <CodeBlock
        language="ts"
        code={`import { chart, tokens } from "@mishrashardendu22/observatory-tokens";
import { chartAxisProps, chartColors, chartTooltipStyle } from "@mishrashardendu22/observatory-ui";

tokens.color["bg-000"].dark;   // "#0e0c0a"
tokens.radius["radius-md"];    // "10px"
chart.primary;                 // "var(--chart-primary)"

<Bar fill={chartColors.primary} />
<XAxis {...chartAxisProps} />
<Tooltip contentStyle={chartTooltipStyle} />`}
      />

      <h2>8. Upgrading</h2>
      <p>
        A change to the system is made in{" "}
        <a href={REPO_URL} target="_blank" rel="noreferrer">
          the repository
        </a>
        , both package versions are bumped, and a tag such as{" "}
        <code>v{VERSION}</code> is pushed. The release workflow verifies, packs
        and attaches the tarballs. An app upgrades by bumping the two URLs in
        its <code>package.json</code> and running <code>pnpm install</code>.
      </p>
    </div>
  );
}
