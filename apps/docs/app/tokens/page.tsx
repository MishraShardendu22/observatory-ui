import { Kicker, Notice } from "@mishrashardendu22/observatory-ui";
import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { Swatch } from "@/components/Swatch";
import { colorGroups, themes, tokens, valueIn } from "@/content/tokens";

export const metadata: Metadata = { title: "Tokens" };

const STEM_TITLES: Record<string, string> = {
  bg: "Grounds",
  border: "Borders",
  ink: "Ink",
  accent: "Accent",
  info: "Info",
  success: "Success",
  danger: "Danger",
  warning: "Warning",
  chart: "Charts",
  focus: "Focus ring",
  selection: "Selection",
  overlay: "Overlay",
};

export default function TokensPage() {
  const groups = colorGroups();
  return (
    <div className="docs-page docs-prose">
      <div>
        <Kicker>Foundations</Kicker>
        <h1>Tokens</h1>
        <p className="docs-lede">
          Every value below is a CSS custom property from{" "}
          <code>@mishrashardendu22/observatory-tokens/tokens.css</code>. The
          chips render with the token itself, so they show the theme this page
          is in; the values list both themes. Names, values and notes come from
          the package's <code>tokens.json</code>.
        </p>
        <CodeBlock
          language="css"
          code={`.card { background: var(--bg-100); border: 1px solid var(--border); border-radius: var(--radius-lg); }`}
        />
      </div>

      <section className="docs-section">
        <h2 id="colour">Colour</h2>
        <p>
          Themes: {tokens.color.themes.map((t) => t.name).join(", ")}. The first
          is the default; the second applies under{" "}
          <code>prefers-color-scheme: light</code> or{" "}
          <code>data-theme="light"</code>.
        </p>
        {groups.map((group) => (
          <div key={group.stem} className="docs-section">
            <h3 id={`colour-${group.stem}`}>
              {STEM_TITLES[group.stem] ?? group.stem}
            </h3>
            <div className="docs-swatches">
              {group.tokens.map((token) => (
                <Swatch key={token.name} token={token} />
              ))}
            </div>
          </div>
        ))}
        <Notice
          variant="warning"
          title="Success and danger differ by hue alone"
        >
          They are the source's green and red (1.3:1 against each other), so a
          status always carries its word or icon. The chart pair is different on
          purpose: <code>chart-primary</code> against <code>chart-failed</code>{" "}
          differ in lightness.
        </Notice>
      </section>

      <section className="docs-section">
        <h2 id="type">Type</h2>
        <p>
          Families:{" "}
          {Object.entries(tokens.type.families).map(([key, stack], i) => (
            <span key={key}>
              {i > 0 && ", "}
              <code>--font-{key}</code> = {stack.split(",")[0]}
            </span>
          ))}
          . Each style is also a class in <code>type.css</code>.
        </p>
        {tokens.type.groups.map((group) => (
          <div key={group.name} className="docs-section">
            <h3 id={`type-${group.name.toLowerCase()}`}>
              {group.name} · {group.family}
            </h3>
            <div className="docs-type">
              {group.styles.map((style) => (
                <div key={style.name} className="docs-type__row">
                  <div className="docs-type__meta">
                    <strong>{style.name}</strong>
                    <span>
                      {style.fontSize} / {style.lineHeight}
                    </span>
                    <span>weight {style.fontWeight}</span>
                    {style.letterSpacing && (
                      <span>tracking {style.letterSpacing}</span>
                    )}
                  </div>
                  <div className={`docs-type__sample ${style.name}`}>
                    {style.sample ?? style.name}
                  </div>
                  {style.usage && (
                    <p className="docs-type__usage">{style.usage}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="docs-section">
        <h2 id="spacing">Spacing</h2>
        {tokens.spacing.note && <p>{tokens.spacing.note}</p>}
        <div className="docs-scale">
          {tokens.spacing.tokens.map((token) => (
            <div key={token.name} className="docs-scale__row">
              <span className="docs-scale__name">{token.name}</span>
              <span className="docs-scale__value">{token.value}</span>
              <div>
                <div
                  className="docs-scale__bar"
                  style={{ width: token.value }}
                  aria-hidden="true"
                />
                {token.usage && (
                  <p className="docs-scale__usage">{token.usage}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <h2 id="radius">Radius</h2>
        {tokens.radius.note && <p>{tokens.radius.note}</p>}
        <div className="docs-scale">
          {tokens.radius.tokens.map((token) => (
            <div key={token.name} className="docs-scale__row">
              <span className="docs-scale__name">{token.name}</span>
              <span className="docs-scale__value">{token.value}</span>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div
                  className="docs-scale__radius"
                  style={{ borderRadius: token.value }}
                  aria-hidden="true"
                />
                {token.usage && (
                  <p className="docs-scale__usage">{token.usage}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <h2 id="shadow">Shadow</h2>
        {tokens.shadow.note && <p>{tokens.shadow.note}</p>}
        <div className="docs-scale">
          {tokens.shadow.tokens.map((token) => (
            <div key={token.name} className="docs-scale__row">
              <span className="docs-scale__name">{token.name}</span>
              <span className="docs-scale__value">
                {themes.map((theme) => (
                  <span key={theme} style={{ display: "block" }}>
                    {theme}: {valueIn(token, theme)}
                  </span>
                ))}
              </span>
              <div>
                <div
                  className="docs-scale__shadow"
                  style={{ boxShadow: `var(--${token.name})` }}
                  aria-hidden="true"
                />
                {token.usage && (
                  <p className="docs-scale__usage">{token.usage}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <h2 id="layout">Layout</h2>
        {tokens.layout.note && <p>{tokens.layout.note}</p>}
        <div className="docs-scale">
          {tokens.layout.tokens.map((token) => (
            <div key={token.name} className="docs-scale__row">
              <span className="docs-scale__name">{token.name}</span>
              <span className="docs-scale__value">{token.value}</span>
              {token.usage && (
                <p className="docs-scale__usage">{token.usage}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
