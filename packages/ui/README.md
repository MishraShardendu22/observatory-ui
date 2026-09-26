# @mishrashardendu22/observatory-ui

React components and the stylesheet of the Observatory design system: buttons,
cards, stat cards, badges, tables, forms, notices, navigation and page chrome,
styled by the custom properties of
[`@mishrashardendu22/observatory-tokens`](../tokens).

The package ships TypeScript source, not a build. A bundler transpiles it
(Next.js: add it to `transpilePackages`), so there is nothing to compile and
the components tree-shake.

## Install

From a GitHub release (no npm account needed):

```bash
pnpm add https://github.com/MishraShardendu22/observatory-ui/releases/download/v0.2.0/mishrashardendu22-observatory-tokens-0.2.0.tgz \
         https://github.com/MishraShardendu22/observatory-ui/releases/download/v0.2.0/mishrashardendu22-observatory-ui-0.2.0.tgz
```

From npm, once a release publishes there:

```bash
pnpm add @mishrashardendu22/observatory-tokens @mishrashardendu22/observatory-ui
```

## Use

```css
/* globals.css */
@import "tailwindcss";
@import "@mishrashardendu22/observatory-tokens/tokens.css";
@import "@mishrashardendu22/observatory-tokens/theme.css";
@import "@mishrashardendu22/observatory-ui/styles.css";
```

```ts
// next.config.ts
const nextConfig = { transpilePackages: ["@mishrashardendu22/observatory-ui"] };
```

```tsx
import Link from "next/link";
import { ButtonLink, PageHeader, StatCard, StatusBadge } from "@mishrashardendu22/observatory-ui";

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
```

Every component renders the class names of `styles.css` (`.btn`, `.card`,
`.stat-card`, `.badge-success`, `.tree-node.active`, `.table`, `.input`), so
markup that already uses those classes keeps working without the components.

## Components

| Component | Purpose |
| --- | --- |
| `Button`, `ButtonLink`, `IconButton`, `buttonClass` | primary / outline / ghost / danger, three sizes, loading state |
| `Badge`, `StatusBadge`, `statusVariant`, `Pill` | the status vocabulary: success, error, running, warning, neutral |
| `Card`, `CardHead`, `CardTitle`, `CardMeta` | default, flat, table and hero cards; `glow` for the one highlighted panel |
| `StatCard`, `StatStrip` | KPI tiles and the landing hero's number strip |
| `PageHeader`, `Kicker` | kicker, serif title with an italic `<em>`, subtitle, actions |
| `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Segmented` | forms |
| `Table`, `TableWrap` | data rows that collapse into cards under 640px |
| `List`, `ListRow` | compact rows with an icon tile and a status mark |
| `Steps` | the numbered how-it-works list |
| `Notice` | inline success / error / warning / info messages |
| `NavCard` | a linking card with an amber icon tile |
| `EmptyState`, `ErrorState`, `LoadingState`, `Spinner`, `Skeleton` | states |
| `AppShell`, `AppContent`, `AppMain`, `MobileHeader`, `SidebarOverlay` | the signed-in app frame: fixed sidebar, main column, a drawer with a top bar under 768px |
| `Sidebar`, `SidebarHeader`, `SidebarBrand`, `SidebarToggle`, `SidebarNav`, `SidebarSection`, `SidebarFooter` | the sidebar's chrome |
| `TreeNode`, `TreeGroup`, `TreeChildren` | sidebar rows: links, folder toggles, actions, collapsed icon-only rows with tooltips |
| `Dropdown` | a select with an optional filter, for page sizes, models and modes |
| `Tabs`, `Tab` | underline tabs between sibling pages |
| `Pagination` | the footer of a paginated table |
| `Dialog` | a modal panel over a scrim, for confirmations and short forms |
| `LoadingPanel` | a tall centred spinner for a region that is loading |
| `GitHubIcon` | the one brand mark |
| `chartColors`, `chartTooltipStyle`, `chartAxisProps`, `chartGridProps` | Recharts props that follow the theme |

Icons are [Lucide](https://lucide.dev): 16px inside controls, 18px in
navigation, 20px in icon tiles. Components that need client-side behaviour
(`Segmented`, `ErrorState`, `Dropdown`, `Pagination`, `Dialog`) carry `"use client"`; the rest
work in server components.

## Theme

Dark is the default. The tokens follow the device when it prefers light; set
`<html data-theme="dark">` to keep dark everywhere. No toggle, no client code.
