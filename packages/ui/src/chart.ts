/**
 * Chart chrome as CSS variable references, so Recharts and plain SVG follow
 * the theme. Successful is always the amber primary series; failed is the
 * dark rust so the two differ in lightness, not only hue.
 */
export const chartColors = {
  primary: "var(--chart-primary)",
  failed: "var(--chart-failed)",
  skipped: "var(--chart-skipped)",
  grid: "var(--chart-grid)",
  axis: "var(--chart-axis)",
  success: "var(--success)",
  danger: "var(--danger)",
  info: "var(--info)",
  warning: "var(--warning)",
} as const;

/** `contentStyle` for a Recharts Tooltip. */
export const chartTooltipStyle = {
  background: "var(--bg-300)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  fontSize: 12,
  color: "var(--ink)",
  fontFamily: "var(--font-sans)",
  boxShadow: "var(--shadow-md)",
} as const;

/** Props for a Recharts XAxis or YAxis. */
export const chartAxisProps = {
  stroke: "var(--chart-axis)",
  fontSize: 11,
  fontFamily: "var(--font-mono)",
  tickLine: false,
  axisLine: false,
} as const;

/** Props for a Recharts CartesianGrid. */
export const chartGridProps = {
  strokeDasharray: "3 3",
  stroke: "var(--chart-grid)",
  vertical: false,
} as const;
