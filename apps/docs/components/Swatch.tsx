import { type ColorToken, themes, valueIn } from "@/content/tokens";

const ALIAS = /^\{([A-Za-z0-9_.-]+)\}$/;

function display(value: string): string {
  const alias = ALIAS.exec(value);
  return alias ? `→ ${alias[1]}` : value;
}

export function Swatch({ token }: { token: ColorToken }) {
  return (
    <div className="docs-swatch">
      <div
        className="docs-swatch__chip"
        style={{ background: `var(--${token.name})` }}
        aria-hidden="true"
      />
      <div className="docs-swatch__name">{token.name}</div>
      <div className="docs-swatch__values">
        {themes.map((theme) => (
          <span key={theme}>
            {theme}: {display(valueIn(token, theme))}
          </span>
        ))}
      </div>
      {token.usage && <p className="docs-swatch__usage">{token.usage}</p>}
    </div>
  );
}
