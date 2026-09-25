# @mishrashardendu22/observatory-tokens

The design tokens of the Observatory design system, the visual language of the
[GitHub Backup Automation System](https://github.com/MishraShardendu22/github-backup-automation-system):
a warm near-black ground, one amber accent, Instrument Serif headlines over
Inter, hairline borders instead of shadows.

`tokens.json` is the source. `pnpm build` generates `dist/`:

| File | What |
| --- | --- |
| `tokens.css` | CSS custom properties. Dark is the default. When the device prefers light and the page does not set `data-theme`, the light values apply. `<html data-theme="dark">` or `"light"` pins a theme. |
| `theme.css` | A Tailwind v4 `@theme inline` block: `bg-bg-100`, `text-ink-muted`, `border-border`, `rounded-lg`, `font-serif`, `shadow-glow`. |
| `type.css` | One class per type style: `.display-xl`, `.body`, `.kicker`, `.stat-value`, `.code`. |
| `index.js` | The resolved values as a typed object (`tokens.color["accent"].dark`) plus `chart` (CSS variable references for chart libraries). Use this from React Native or anything without CSS. |

## Use

```css
/* globals.css, before your own rules */
@import "tailwindcss";
@import "@mishrashardendu22/observatory-tokens/tokens.css";
@import "@mishrashardendu22/observatory-tokens/theme.css";
```

```ts
import { chart, tokens } from "@mishrashardendu22/observatory-tokens";
<Bar fill={chart.primary} />;            // "var(--chart-primary)"
tokens.color["bg-000"].dark;              // "#0e0c0a"
```

The font stacks name Google-hosted faces. An app that self-hosts them (Next.js
`next/font`) overrides `--font-serif`, `--font-sans` and `--font-mono` after the
import.

Colour rules, contrast notes and the usage of every token are in the brand book
of the design system; each token also carries its `usage` in `tokens.json`.
