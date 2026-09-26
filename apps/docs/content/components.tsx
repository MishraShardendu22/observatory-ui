import {
  Badge,
  Button,
  ButtonLink,
  Card,
  CardHead,
  CardMeta,
  CardTitle,
  Checkbox,
  EmptyState,
  Field,
  GitHubIcon,
  IconButton,
  Input,
  Kicker,
  List,
  ListRow,
  LoadingState,
  NavCard,
  Notice,
  PageHeader,
  Pill,
  Skeleton,
  StatCard,
  StatStrip,
  StatusBadge,
  Steps,
  Table,
  TableWrap,
  Textarea,
} from "@mishrashardendu22/observatory-ui";
import {
  Archive,
  ArrowRight,
  BarChart3,
  Inbox,
  Play,
  RefreshCw,
  Trash2,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  ErrorStateDemo,
  LoadingButtonDemo,
  SegmentedDemo,
} from "@/components/demos";

const SAMPLE_BARS = [60, 80, 50, 95, 110, 70, 85, 130, 75, 100, 115, 65].map(
  (h, i) => ({ x: 44 + i * 40, h }),
);
const SAMPLE_FAILED = [10, 0, 20, 0, 5, 0, 15, 0, 10, 0, 0, 8].map((h, i) => ({
  x: 60 + i * 40,
  h,
}));

export interface PropRow {
  name: string;
  type: string;
  description: string;
}

export interface ComponentExample {
  title: string;
  code: string;
  render: () => ReactNode;
  /** No padding and no flex frame: for full-width blocks. */
  bare?: boolean;
}

export interface ComponentDoc {
  slug: string;
  name: string;
  group: "Actions" | "Layout" | "Data" | "Forms" | "Feedback" | "Marketing";
  summary: string;
  guidelines: string[];
  examples: ComponentExample[];
  props: PropRow[];
}

export const GROUPS: ComponentDoc["group"][] = [
  "Actions",
  "Layout",
  "Data",
  "Forms",
  "Feedback",
  "Marketing",
];

export const components: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    group: "Actions",
    summary:
      "One button family: primary amber for the one main action, outline for the secondary, ghost for tertiary, danger for destructive.",
    guidelines: [
      "One primary button per view, and it is the action the page exists for. Everything beside it is outline; anything inside a card header or row is ghost or an IconButton.",
      "Labels are sentence case with a verb first. A leading Lucide icon at 16px is optional; a trailing arrow marks navigation.",
      "Loading swaps the leading icon for a spinner and keeps the label, so the width does not jump.",
      "Sizes: 40px by default, sm (32px) inside cards and table rows, lg (48px) in a hero only.",
      "Links that look like buttons use ButtonLink with component={Link} for client navigation.",
    ],
    examples: [
      {
        title: "Variants",
        code: `<Button>Open Dashboard</Button>
<Button variant="outline" leftIcon={<GitHubIcon />}>View on GitHub</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="danger" leftIcon={<Trash2 />}>Delete run</Button>
<IconButton aria-label="Refresh"><RefreshCw /></IconButton>`,
        render: () => (
          <>
            <Button rightIcon={<ArrowRight aria-hidden="true" />}>
              Open Dashboard
            </Button>
            <Button variant="outline" leftIcon={<GitHubIcon />}>
              View on GitHub
            </Button>
            <Button variant="ghost">Cancel</Button>
            <Button variant="danger" leftIcon={<Trash2 aria-hidden="true" />}>
              Delete run
            </Button>
            <IconButton aria-label="Refresh">
              <RefreshCw aria-hidden="true" />
            </IconButton>
          </>
        ),
      },
      {
        title: "Sizes, loading and disabled",
        code: `<Button size="sm">Run backup</Button>
<Button size="lg" rightIcon={<ArrowRight />}>Start backing up</Button>
<Button loading>Backing up</Button>
<Button variant="outline" disabled>Disabled</Button>`,
        render: () => (
          <>
            <Button size="sm">Run backup</Button>
            <Button size="lg" rightIcon={<ArrowRight aria-hidden="true" />}>
              Start backing up
            </Button>
            <LoadingButtonDemo />
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </>
        ),
      },
      {
        title: "As a link",
        code: `import Link from "next/link";
<ButtonLink component={Link} href="/backups" variant="outline">View history</ButtonLink>`,
        render: () => (
          <ButtonLink
            href="#"
            variant="outline"
            rightIcon={<ArrowRight aria-hidden="true" />}
          >
            View history
          </ButtonLink>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: '"primary" | "outline" | "ghost" | "danger"',
        description: "Defaults to primary.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        description: "Defaults to md (40px).",
      },
      {
        name: "loading",
        type: "boolean",
        description:
          "Shows a spinner in place of the leading icon and disables the button.",
      },
      {
        name: "leftIcon, rightIcon",
        type: "ReactNode",
        description: "16px icons.",
      },
      {
        name: "component",
        type: "ElementType",
        description:
          "ButtonLink only: the element to render, next/link for client navigation.",
      },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    group: "Feedback",
    summary:
      "A status pill with a leading dot and its word, in the fixed status vocabulary; StatusBadge picks the colour from an API status word.",
    guidelines: [
      "success = Completed, error = Failed, running = Running (the dot pulses), warning = Degraded, neutral = Skipped or Idle.",
      "The word is never omitted: success and danger differ by hue alone.",
      "StatusBadge maps the words the backup API and the Observatory produce (completed, running, failed, skipped, ...) to a variant.",
      "Pill is the plain tag for branches, versions and tool names.",
    ],
    examples: [
      {
        title: "Variants",
        code: `<Badge variant="success">Completed</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="running">Running</Badge>
<Badge variant="warning">Degraded</Badge>
<Badge>Skipped</Badge>
<Pill>main</Pill>`,
        render: () => (
          <>
            <Badge variant="success">Completed</Badge>
            <Badge variant="error">Failed</Badge>
            <Badge variant="running">Running</Badge>
            <Badge variant="warning">Degraded</Badge>
            <Badge>Skipped</Badge>
            <Pill>main</Pill>
            <Pill>v2.4.1</Pill>
          </>
        ),
      },
      {
        title: "From a status word",
        code: `<StatusBadge status={run.status} />   // "completed" | "running" | "failed" | "skipped" | ...`,
        render: () => (
          <>
            <StatusBadge status="completed" />
            <StatusBadge status="running" />
            <StatusBadge status="failed" />
            <StatusBadge status="skipped" />
          </>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: '"success" | "error" | "running" | "warning" | "neutral"',
        description: "Badge only; defaults to neutral.",
      },
      {
        name: "status",
        type: "string | null | undefined",
        description: "StatusBadge only: the word to map and show.",
      },
      {
        name: "statusVariant(status)",
        type: "function",
        description: "The mapping, exported for lists and charts.",
      },
    ],
  },
  {
    slug: "card",
    name: "Card",
    group: "Layout",
    summary:
      "The container for everything on a page: a flat surface with a hairline border. Flat tiles nest inside it; glow marks the one highlighted panel.",
    guidelines: [
      "Default cards pad 24px; flat cards (bg-200, 10px radius) are tiles inside a card; table cards have no padding so rules run edge to edge; hero cards use the 20px radius for a landing panel.",
      "A CardHead holds a CardTitle or a kicker plus headline on the left, and a small action or CardMeta timestamp on the right.",
      "Never nest a card in a card (use flat), never add a gradient or a coloured edge, and never more than one glow per view.",
    ],
    examples: [
      {
        title: "Card with a head and flat tiles",
        bare: true,
        code: `<Card>
  <CardHead>
    <div><Kicker>Latest run</Kicker><h3>Backup run #1,240</h3></div>
    <ButtonLink href="/backups/1240" variant="outline" size="sm">View full results</ButtonLink>
  </CardHead>
  <div className="metric-grid metric-grid--two">
    <StatCard flat label="Successful" tone="success" value={40} />
    <StatCard flat label="Failed" tone="danger" value={2} />
  </div>
</Card>`,
        render: () => (
          <Card>
            <CardHead>
              <div>
                <Kicker>Latest run</Kicker>
                <h3
                  style={{
                    fontSize: 26,
                    lineHeight: "32px",
                    margin: "6px 0 4px",
                  }}
                >
                  Backup run #1,240
                </h3>
                <CardMeta>Started Oct 22, 14:02 · 4m 12s</CardMeta>
              </div>
              <ButtonLink
                href="#"
                variant="outline"
                size="sm"
                rightIcon={<ArrowRight aria-hidden="true" />}
              >
                View full results
              </ButtonLink>
            </CardHead>
            <div className="metric-grid metric-grid--two">
              <StatCard flat label="Successful" tone="success" value={40} />
              <StatCard flat label="Failed" tone="danger" value={2} />
            </div>
          </Card>
        ),
      },
      {
        title: "Glow: the one highlighted panel",
        bare: true,
        code: `<Card glow>
  <Kicker>Ready</Kicker>
  <h3>Start backing up</h3>
  <p>Four repositories selected. The first run takes about a minute.</p>
  <Button leftIcon={<Play />}>Run now</Button>
</Card>`,
        render: () => (
          <Card glow style={{ maxWidth: 360 }}>
            <Kicker>Ready</Kicker>
            <h3
              style={{ fontSize: 26, lineHeight: "32px", margin: "6px 0 8px" }}
            >
              Start backing up
            </h3>
            <p
              className="text-secondary"
              style={{ fontSize: 14, lineHeight: "22px" }}
            >
              Four repositories selected. The first run takes about a minute.
            </p>
            <Button
              leftIcon={<Play aria-hidden="true" />}
              style={{ marginTop: 16 }}
            >
              Run now
            </Button>
          </Card>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: '"default" | "flat" | "table" | "hero"',
        description: "The surface. Defaults to default.",
      },
      {
        name: "glow",
        type: "boolean",
        description: "Amber border and glow for the one highlighted panel.",
      },
      {
        name: "as",
        type: "ElementType",
        description:
          "section by default; div, article or li where the markup needs it.",
      },
    ],
  },
  {
    slug: "stat-card",
    name: "StatCard",
    group: "Data",
    summary:
      "A KPI tile: an uppercase label, a serif number and an optional delta line. StatStrip is the hairline-separated row for a landing hero.",
    guidelines: [
      "Always in a metric grid: four across, two under 960px, one under 640px.",
      "The value is a formatted string; the component does not format numbers. Tabular figures keep columns aligned.",
      "Colour the value only when the number itself is a health signal (success rate, failed count).",
      "No icons in a stat card, no coloured labels, no animated numbers.",
    ],
    examples: [
      {
        title: "A metric grid",
        bare: true,
        code: `<div className="metric-grid metric-grid--four">
  <StatCard label="Repositories" value={42} delta={{ direction: "up", label: "+12% from last month" }} />
  <StatCard label="Total backups" value="1,240" delta={{ direction: "up", label: "+18% from last month" }} />
  <StatCard label="Storage used" value="12.6 GB" delta={{ direction: "down", label: "-6% from last month" }} />
  <StatCard label="Success rate" tone="success" value="99.9%" delta={{ label: "Last 30 days" }} />
</div>`,
        render: () => (
          <div className="metric-grid metric-grid--four">
            <StatCard
              label="Repositories"
              value={42}
              delta={{ direction: "up", label: "+12% from last month" }}
            />
            <StatCard
              label="Total backups"
              value="1,240"
              delta={{ direction: "up", label: "+18% from last month" }}
            />
            <StatCard
              label="Storage used"
              value="12.6 GB"
              delta={{ direction: "down", label: "-6% from last month" }}
            />
            <StatCard
              label="Success rate"
              tone="success"
              value="99.9%"
              delta={{ label: "Last 30 days" }}
            />
          </div>
        ),
      },
      {
        title: "StatStrip",
        bare: true,
        code: `<StatStrip items={[
  { value: 175, label: "Repositories tracked" },
  { value: 29, label: "Backup runs" },
  { value: "99.7%", label: "Success rate" },
  { value: "1.0 GB", label: "Archived so far" },
]} />`,
        render: () => (
          <StatStrip
            items={[
              { value: 175, label: "Repositories tracked" },
              { value: 29, label: "Backup runs" },
              { value: "99.7%", label: "Success rate" },
              { value: "1.0 GB", label: "Archived so far" },
            ]}
          />
        ),
      },
    ],
    props: [
      {
        name: "label, value",
        type: "ReactNode",
        description: "The uppercase label and the serif number.",
      },
      {
        name: "tone",
        type: '"default" | "success" | "danger" | "muted"',
        description: "Colours the value.",
      },
      {
        name: "delta",
        type: "{ direction?: 'up' | 'down' | 'flat'; label: ReactNode }",
        description: "The caption line under the value.",
      },
      {
        name: "flat, compact",
        type: "boolean",
        description: "A tile inside a card; a shorter tile for dense grids.",
      },
      {
        name: "items",
        type: "{ value; label }[]",
        description: "StatStrip only.",
      },
    ],
  },
  {
    slug: "page-header",
    name: "PageHeader",
    group: "Layout",
    summary:
      "The top of a page: a kicker, a serif title with one italic accent word, a one-line subtitle and the page's actions on the right.",
    guidelines: [
      "The kicker is uppercase in accent; the title is the 56px display style with at most one <em>; the subtitle stays under 560px.",
      "Up to three actions: a status badge, a timestamp in CardMeta, one button.",
      "No second heading level between the title and the first card; filters belong in the card they filter.",
    ],
    examples: [
      {
        title: "With actions",
        bare: true,
        code: `<PageHeader
  kicker="Backup operations"
  title={<>System <em>Status</em></>}
  subtitle="Runs, repository health and storage, as the worker reports them."
  actions={<><StatusBadge status="completed" /><CardMeta>Last run Oct 22, 14:02</CardMeta><Button variant="outline">Refresh</Button></>}
/>`,
        render: () => (
          <PageHeader
            kicker="Backup operations"
            title={
              <>
                System <em>Status</em>
              </>
            }
            subtitle="Runs, repository health and storage, as the worker reports them."
            actions={
              <>
                <StatusBadge status="completed" />
                <CardMeta>Last run Oct 22, 14:02</CardMeta>
                <Button
                  variant="outline"
                  leftIcon={<RefreshCw aria-hidden="true" />}
                >
                  Refresh
                </Button>
              </>
            }
          />
        ),
      },
    ],
    props: [
      {
        name: "kicker",
        type: "ReactNode",
        description: "The uppercase eyebrow.",
      },
      {
        name: "title",
        type: "ReactNode",
        description: "Wrap one word in <em> for the italic accent.",
      },
      { name: "titleAs", type: "ElementType", description: "h1 by default." },
      {
        name: "subtitle, actions",
        type: "ReactNode",
        description: "One line of body-lg; up to three actions.",
      },
    ],
  },
  {
    slug: "forms",
    name: "Forms",
    group: "Forms",
    summary:
      "Field wraps a label, a control and one line of hint or error; Input, Textarea, Select, Checkbox and Segmented are the controls.",
    guidelines: [
      "Controls sit on bg-200 with a hairline border; focus turns the border amber with a soft halo; an error turns it danger.",
      "Repository names, cron expressions and ids take the mono input.",
      "A segmented control is for two to five options and is controlled: pass value and onChange.",
      "Never put an input directly on the page ground, and never use placeholder text as the label.",
    ],
    examples: [
      {
        title: "Fields",
        bare: true,
        code: `<Field label="Repository" htmlFor="repo" hint="owner/name as it appears on GitHub">
  <Input id="repo" mono defaultValue="mishra-shardendu/observatory" />
</Field>
<Field label="Schedule (cron)" htmlFor="cron" error="Day of week must be 0 to 7.">
  <Input id="cron" mono defaultValue="0 3 * * 8" />
</Field>
<Field label="Notes" htmlFor="notes"><Textarea id="notes" placeholder="Anything the next run should know" /></Field>
<Checkbox label="keploy/keploy" defaultChecked />`,
        render: () => (
          <div className="docs-example__stack" style={{ maxWidth: 480 }}>
            <Field
              label="Repository"
              htmlFor="repo"
              hint="owner/name as it appears on GitHub"
            >
              <Input
                id="repo"
                mono
                defaultValue="mishra-shardendu/observatory"
              />
            </Field>
            <Field
              label="Schedule (cron)"
              htmlFor="cron"
              error="Day of week must be 0 to 7."
            >
              <Input id="cron" mono defaultValue="0 3 * * 8" />
            </Field>
            <Field label="Notes" htmlFor="notes">
              <Textarea
                id="notes"
                placeholder="Anything the next run should know"
              />
            </Field>
            <div style={{ display: "grid", gap: 8 }}>
              <Checkbox
                label={<span className="mono">keploy/keploy</span>}
                defaultChecked
              />
              <Checkbox label={<span className="mono">vercel/next.js</span>} />
            </div>
          </div>
        ),
      },
      {
        title: "Segmented control",
        code: `const [range, setRange] = useState("7d");
<Segmented aria-label="Range" options={[{ value: "24h", label: "24h" }, { value: "7d", label: "7d" }, { value: "30d", label: "30d" }]} value={range} onChange={setRange} />`,
        render: () => <SegmentedDemo />,
      },
    ],
    props: [
      {
        name: "label, htmlFor, hint, error",
        type: "ReactNode / string",
        description:
          "Field: the label focuses the control with htmlFor; error replaces the hint.",
      },
      {
        name: "mono",
        type: "boolean",
        description: "Input: monospace for machine-produced values.",
      },
      {
        name: "options, value, onChange, aria-label",
        type: "SegmentedOption[], T, (value: T) => void, string",
        description: "Segmented: controlled, two to five options.",
      },
    ],
  },
  {
    slug: "table",
    name: "Table",
    group: "Data",
    summary:
      "Data rows with uppercase header cells and hairline rules; under 640px each row collapses into a label/value card when cells carry a data-label.",
    guidelines: [
      "The first column is the row's identity (a repository name in mono) and reads in ink; other cells read in ink-secondary. Numbers go in .num cells, right aligned.",
      "A status column holds a StatusBadge; a trailing chevron column marks rows that open a detail page.",
      'Put the table in a Card variant="table" so the rules run edge to edge; wrap wide tables in TableWrap.',
      "No zebra stripes, no centred text, one action per row at most.",
    ],
    examples: [
      {
        title: "Backup history",
        bare: true,
        code: `<Card variant="table">
  <TableWrap>
    <Table>
      <thead><tr><th>Repository</th><th>Status</th><th>Started</th><th className="num">Size</th></tr></thead>
      <tbody>
        <tr><td data-label="Repository" className="mono">keploy/keploy</td><td data-label="Status"><StatusBadge status="running" /></td>…</tr>
      </tbody>
    </Table>
  </TableWrap>
</Card>`,
        render: () => (
          <Card variant="table">
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <th>Repository</th>
                    <th>Status</th>
                    <th>Started</th>
                    <th className="num">Duration</th>
                    <th className="num">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "mishra-shardendu/observatory",
                      "completed",
                      "2 minutes ago",
                      "1m 04s",
                      "412 MB",
                    ],
                    ["keploy/keploy", "running", "12 minutes ago", "—", "—"],
                    [
                      "anthropics/claude-code",
                      "failed",
                      "1 hour ago",
                      "0m 18s",
                      "—",
                    ],
                    ["vercel/next.js", "skipped", "2 hours ago", "—", "6.4 GB"],
                  ].map(([repo, status, started, duration, size]) => (
                    <tr key={repo}>
                      <td data-label="Repository" className="mono">
                        {repo}
                      </td>
                      <td data-label="Status">
                        <StatusBadge status={status} />
                      </td>
                      <td data-label="Started">{started}</td>
                      <td data-label="Duration" className="num">
                        {duration}
                      </td>
                      <td data-label="Size" className="num">
                        {size}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          </Card>
        ),
      },
    ],
    props: [
      {
        name: "wide",
        type: "boolean",
        description: "Keeps a 720px minimum width inside a TableWrap.",
      },
      {
        name: "data-label",
        type: "string on each td",
        description: "The label shown when the row collapses under 640px.",
      },
    ],
  },
  {
    slug: "list-row",
    name: "ListRow",
    group: "Data",
    summary:
      "A compact row for a recent-items list: an icon tile, a mono title with a caption, and a status mark with a chevron.",
    guidelines: [
      "The status mark is a success check, a danger x or a running spinner; the caption repeats the status word so the row never relies on colour alone.",
      "Pass href for a link (and component={Link} in Next.js); the chevron shows automatically.",
      "More than six rows want a View all link.",
    ],
    examples: [
      {
        title: "Recent backups",
        bare: true,
        code: `<List>
  <ListRow href="/backups/1" icon={<GitHubIcon />} title="mishra-shardendu/observatory" meta="2 minutes ago" status="success" />
  <ListRow href="/backups/2" icon={<GitHubIcon />} title="keploy/keploy" meta="12 minutes ago" status="running" />
  <ListRow href="/backups/3" icon={<GitHubIcon />} title="anthropics/claude-code" meta="1 hour ago · failed" status="danger" />
</List>`,
        render: () => (
          <Card style={{ maxWidth: 380 }}>
            <CardHead>
              <CardTitle>Recent backups</CardTitle>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </CardHead>
            <List>
              <ListRow
                href="#"
                icon={<GitHubIcon />}
                title="mishra-shardendu/observatory"
                meta="2 minutes ago"
                status="success"
              />
              <ListRow
                href="#"
                icon={<GitHubIcon />}
                title="keploy/keploy"
                meta="12 minutes ago"
                status="running"
              />
              <ListRow
                href="#"
                icon={<GitHubIcon />}
                title="anthropics/claude-code"
                meta="1 hour ago · failed"
                status="danger"
              />
            </List>
          </Card>
        ),
      },
    ],
    props: [
      {
        name: "icon, title, meta",
        type: "ReactNode",
        description: "The tile, the mono title and the caption.",
      },
      {
        name: "status",
        type: '"success" | "danger" | "running" | "none"',
        description: "The mark on the right.",
      },
      {
        name: "href, component, chevron, trailing",
        type: "string, ElementType, boolean, ReactNode",
        description:
          "Link target, the element to render, whether to show the chevron, extra content before the mark.",
      },
    ],
  },
  {
    slug: "steps",
    name: "Steps",
    group: "Marketing",
    summary:
      "A numbered vertical list with a connector line, for a landing page's how-it-works section; three or four steps.",
    guidelines: [
      "Each step is a display-sm title and one sentence. Mark completed steps with done to fill the number.",
      "Not for wizards inside the app; use a segmented control or a plain form there.",
    ],
    examples: [
      {
        title: "Three steps",
        bare: true,
        code: `<Steps steps={[
  { title: "Connect your GitHub", body: "Install the GitHub App and sign the worker in with one command.", done: true },
  { title: "Choose a sink and a schedule", body: "Pick git, local or S3 storage and how often to run." },
  { title: "Monitor and relax", body: "Watch runs in the dashboard and ask the observatory what changed." },
]} />`,
        render: () => (
          <Steps
            steps={[
              {
                title: "Connect your GitHub",
                body: "Install the GitHub App and sign the worker in with one command.",
                done: true,
              },
              {
                title: "Choose a sink and a schedule",
                body: "Pick git, local or S3 storage and how often to run.",
              },
              {
                title: "Monitor and relax",
                body: "Watch runs in the dashboard and ask the observatory what changed.",
              },
            ]}
          />
        ),
      },
    ],
    props: [
      {
        name: "steps",
        type: "{ title; body?; done? }[]",
        description: "Ordered static copy.",
      },
    ],
  },
  {
    slug: "notice",
    name: "Notice",
    group: "Feedback",
    summary:
      "An inline message with an icon, a bold title, one sentence and an optional action, in success, error, warning, info or neutral.",
    guidelines: [
      "The title states what happened; the body states the next step; at most one small button.",
      'An error notice gets role="alert" automatically; the others are status.',
      "Never stack more than two, never auto-dismiss an error, and use a dialog rather than a notice for a confirmation.",
    ],
    examples: [
      {
        title: "Variants",
        bare: true,
        code: `<Notice variant="success" title="Backup completed">42 repositories backed up in 4m 12s.</Notice>
<Notice variant="error" title="Backup of anthropics/claude-code failed" action={<Button variant="outline" size="sm">Retry</Button>}>
  Bundle upload timed out after 30s. Retry or view the log.
</Notice>
<Notice variant="warning" title="Worker lease expiring">Another machine may take over the backup-run lease in 5 minutes.</Notice>
<Notice variant="info" title="Index generation building">Semantic search keeps using the active generation until this one is ready.</Notice>`,
        render: () => (
          <div className="docs-example__stack" style={{ maxWidth: 640 }}>
            <Notice variant="success" title="Backup completed">
              42 repositories backed up in 4m 12s.
            </Notice>
            <Notice
              variant="error"
              title="Backup of anthropics/claude-code failed"
              action={
                <Button variant="outline" size="sm">
                  Retry
                </Button>
              }
            >
              Bundle upload timed out after 30s. Retry or view the log.
            </Notice>
            <Notice variant="warning" title="Worker lease expiring">
              Another machine may take over the backup-run lease in 5 minutes.
            </Notice>
            <Notice variant="info" title="Index generation building">
              Semantic search keeps using the active generation until this one
              is ready.
            </Notice>
          </div>
        ),
      },
    ],
    props: [
      {
        name: "variant",
        type: '"neutral" | "success" | "error" | "warning" | "info"',
        description: "Picks the tint, the ink and the default icon.",
      },
      {
        name: "title, children, action, icon",
        type: "ReactNode",
        description:
          "The bold title, one sentence, one small button, an icon override (null hides it).",
      },
    ],
  },
  {
    slug: "nav-card",
    name: "NavCard",
    group: "Marketing",
    summary:
      "A linking card with an amber icon tile, a serif title and one sentence; the whole card is the link and it glows on hover.",
    guidelines: [
      "A functional Lucide icon at 20px, a title of two or three words, one sentence in ink-secondary.",
      "Four in a row at most; pass component={Link} for client navigation.",
      "No button inside it, no decorative icon.",
    ],
    examples: [
      {
        title: "A feature grid",
        bare: true,
        code: `<div className="metric-grid metric-grid--three">
  <NavCard component={Link} href="/backups" icon={<Archive />} kicker="Archive" title="Backup history" body="All past runs and per-repository results." />
  …
</div>`,
        render: () => (
          <div className="metric-grid metric-grid--three">
            <NavCard
              href="#"
              icon={<Archive aria-hidden="true" />}
              kicker="Archive"
              title="Backup history"
              body="All past runs and per-repository results."
            />
            <NavCard
              href="#"
              icon={<BarChart3 aria-hidden="true" />}
              kicker="Insights"
              title="Analytics"
              body="Charts and trends over the last 7 to 90 days."
            />
            <NavCard
              href="#"
              icon={<Play aria-hidden="true" />}
              kicker="Run"
              title="Start a backup"
              body="Queue a run for every tracked repository now."
            />
          </div>
        ),
      },
    ],
    props: [
      {
        name: "icon, kicker, title, body",
        type: "ReactNode",
        description:
          "The tile, the optional eyebrow, the serif title and one sentence.",
      },
      {
        name: "href, component",
        type: "string, ElementType",
        description: "The link target and the element to render.",
      },
    ],
  },
  {
    slug: "states",
    name: "States",
    group: "Feedback",
    summary:
      "EmptyState, ErrorState, LoadingState, Spinner and Skeleton: what a region shows when it has nothing, failed, or is still loading.",
    guidelines: [
      "Empty: a dashed panel with an icon, a title that names what is missing, one sentence on how to get one, and one primary button.",
      "Error: the message beside a warning icon and a Try again button; the region, not the page, shows it.",
      "Loading: a spinner beside a short message for a region, skeletons in the shape of the content for a card.",
    ],
    examples: [
      {
        title: "Empty",
        bare: true,
        code: `<EmptyState icon={<Inbox />} title="No backups yet" description="Connect a repository and run your first backup. It takes about a minute." action={<Button leftIcon={<Play />}>Run first backup</Button>} />`,
        render: () => (
          <EmptyState
            icon={<Inbox aria-hidden="true" />}
            title="No backups yet"
            description="Connect a repository and run your first backup. It takes about a minute."
            action={
              <Button leftIcon={<Play aria-hidden="true" />}>
                Run first backup
              </Button>
            }
            style={{ maxWidth: 560 }}
          />
        ),
      },
      {
        title: "Error and loading",
        code: `<ErrorState message="Bundle upload timed out after 30s." retry={() => refetch()} />
<LoadingState message="Connecting to the vector registry" />
<Skeleton width={240} height={40} />`,
        render: () => (
          <div className="docs-example__stack">
            <ErrorStateDemo />
            <LoadingState message="Connecting to the vector registry" />
            <div style={{ display: "grid", gap: 8, maxWidth: 320 }}>
              <Skeleton width="60%" height={20} />
              <Skeleton height={64} />
            </div>
          </div>
        ),
      },
    ],
    props: [
      {
        name: "icon, title, description, action",
        type: "ReactNode",
        description: "EmptyState.",
      },
      {
        name: "message, retry, retryLabel",
        type: "ReactNode, () => void, ReactNode",
        description: "ErrorState.",
      },
      {
        name: "message, size",
        type: 'ReactNode, "sm" | "md" | "lg"',
        description: "LoadingState and Spinner.",
      },
      {
        name: "width, height",
        type: "number | string",
        description: "Skeleton.",
      },
    ],
  },
  {
    slug: "chart",
    name: "Chart helpers",
    group: "Data",
    summary:
      "Props for Recharts, or any SVG, that follow the theme: chartColors, chartAxisProps, chartGridProps and chartTooltipStyle.",
    guidelines: [
      "Successful is always the amber primary series; failed is the dark rust so the two differ in lightness, not only hue; skipped is the neutral.",
      "Charts sit in a card with a CardTitle, a legend of 8px squares and a 200px frame (.chart-card, .chart-legend, .chart-frame).",
      "Bars have 4px top radii; grids are dashed 3 3; axis ticks are 11px mono; tooltips sit on bg-300.",
    ],
    examples: [
      {
        title: "Recharts",
        bare: true,
        code: `import { chartAxisProps, chartColors, chartGridProps, chartTooltipStyle } from "@mishrashardendu22/observatory-ui";

<BarChart data={data}>
  <CartesianGrid {...chartGridProps} />
  <XAxis dataKey="date" {...chartAxisProps} />
  <YAxis {...chartAxisProps} width={32} />
  <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "var(--bg-200)" }} />
  <Bar dataKey="successful" fill={chartColors.primary} radius={[4, 4, 0, 0]} />
  <Bar dataKey="failed" fill={chartColors.failed} radius={[4, 4, 0, 0]} />
</BarChart>`,
        render: () => (
          <Card className="chart-card" style={{ maxWidth: 560 }}>
            <div className="card__head" style={{ margin: 0 }}>
              <CardTitle>Backup activity</CardTitle>
              <div className="chart-legend">
                <span className="chart-legend__item">
                  <span
                    className="chart-legend__dot"
                    style={{ background: "var(--chart-primary)" }}
                  />
                  Successful
                </span>
                <span className="chart-legend__item">
                  <span
                    className="chart-legend__dot"
                    style={{ background: "var(--chart-failed)" }}
                  />
                  Failed
                </span>
              </div>
            </div>
            <div className="chart-frame">
              <svg
                viewBox="0 0 520 200"
                width="100%"
                height="200"
                aria-hidden="true"
                style={{ display: "block" }}
              >
                <g stroke="var(--chart-grid)" strokeDasharray="3 3">
                  <line x1="32" x2="520" y1="20" y2="20" />
                  <line x1="32" x2="520" y1="70" y2="70" />
                  <line x1="32" x2="520" y1="120" y2="120" />
                  <line x1="32" x2="520" y1="170" y2="170" />
                </g>
                <g className="chart-axis">
                  <text x="0" y="24">
                    30
                  </text>
                  <text x="0" y="74">
                    20
                  </text>
                  <text x="0" y="124">
                    10
                  </text>
                  <text x="0" y="174">
                    0
                  </text>
                </g>
                <g style={{ fill: "var(--chart-primary)" }}>
                  {SAMPLE_BARS.map((bar) => (
                    <rect
                      key={bar.x}
                      x={bar.x}
                      y={170 - bar.h}
                      width={14}
                      height={bar.h}
                      rx={3}
                    />
                  ))}
                </g>
                <g style={{ fill: "var(--chart-failed)" }}>
                  {SAMPLE_FAILED.filter((bar) => bar.h > 0).map((bar) => (
                    <rect
                      key={bar.x}
                      x={bar.x}
                      y={170 - bar.h}
                      width={6}
                      height={bar.h}
                      rx={2}
                    />
                  ))}
                </g>
              </svg>
            </div>
          </Card>
        ),
      },
    ],
    props: [
      {
        name: "chartColors",
        type: "{ primary, failed, skipped, grid, axis, success, danger, info, warning }",
        description: "CSS variable references.",
      },
      {
        name: "chartAxisProps, chartGridProps",
        type: "object",
        description: "Spread onto XAxis/YAxis and CartesianGrid.",
      },
      {
        name: "chartTooltipStyle",
        type: "CSSProperties",
        description: "contentStyle for a Tooltip.",
      },
    ],
  },
];

export function findComponent(slug: string): ComponentDoc | undefined {
  return components.find((c) => c.slug === slug);
}
