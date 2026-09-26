import raw from "@mishrashardendu22/observatory-tokens/tokens.json";

export interface ColorToken {
  name: string;
  value: string | Record<string, string>;
  usage?: string;
}
export interface PlainToken {
  name: string;
  value: string;
  usage?: string;
}
export interface TypeStyle {
  name: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
  fontStyle?: string;
  family?: string;
  sample?: string;
  usage?: string;
}
export interface TypeGroup {
  name: string;
  family: string;
  styles: TypeStyle[];
}
export interface TokensFile {
  name: string;
  version: number;
  color: { themes: { id: string; name: string }[]; tokens: ColorToken[] };
  type: { families: Record<string, string>; groups: TypeGroup[] };
  spacing: { note?: string; tokens: PlainToken[] };
  radius: { note?: string; tokens: PlainToken[] };
  shadow: { note?: string; tokens: ColorToken[] };
  layout: { note?: string; tokens: PlainToken[] };
}

export const tokens = raw as unknown as TokensFile;
export const themes = tokens.color.themes.map((t) => t.id);

/** The value of a themed token in one theme; an alias stays as `{name}`. */
export function valueIn(token: ColorToken, theme: string): string {
  if (typeof token.value === "string") return token.value;
  return token.value[theme] ?? token.value[themes[0] ?? "dark"] ?? "";
}

/** Colour tokens grouped by their name stem: bg, ink, accent, chart, ... */
export function colorGroups(): { stem: string; tokens: ColorToken[] }[] {
  const order: string[] = [];
  const groups = new Map<string, ColorToken[]>();
  for (const token of tokens.color.tokens) {
    const stem = token.name.split("-")[0] ?? token.name;
    if (!groups.has(stem)) {
      groups.set(stem, []);
      order.push(stem);
    }
    groups.get(stem)?.push(token);
  }
  return order.map((stem) => ({ stem, tokens: groups.get(stem) ?? [] }));
}
