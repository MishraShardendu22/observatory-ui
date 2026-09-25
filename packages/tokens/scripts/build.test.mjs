import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { themedValue } from "./build.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

test("every colour token has a value the page can read in the first theme", () => {
  const ok =
    /^(#[0-9a-f]{3,8}|rgba?\([^()]*\)|hsla?\([^()]*\)|oklch\([^()]*\)|var\(--[a-z0-9-]+\))$/;
  for (const token of tokens.color.tokens) {
    assert.match(themedValue(token, "dark"), ok, token.name);
    assert.match(themedValue(token, "light"), ok, token.name);
  }
});

test("aliases point at tokens that exist", () => {
  const names = new Set(tokens.color.tokens.map((t) => t.name));
  for (const token of tokens.color.tokens) {
    for (const theme of ["dark", "light"]) {
      const value = themedValue(token, theme);
      const m = /^var\(--(.+)\)$/.exec(value);
      if (m) assert.ok(names.has(m[1]), `${token.name} -> ${m[1]}`);
    }
  }
});

test("token names are unique across families", () => {
  const seen = new Set();
  for (const family of ["color", "spacing", "radius", "shadow", "layout"]) {
    for (const token of tokens[family].tokens) {
      assert.ok(!seen.has(token.name), `duplicate ${token.name}`);
      seen.add(token.name);
    }
  }
});

test("dist is generated from the current tokens.json", () => {
  const css = readFileSync(join(root, "dist", "tokens.css"), "utf8");
  for (const token of tokens.color.tokens) {
    assert.ok(css.includes(`--${token.name}:`), `dist misses ${token.name}`);
  }
  assert.ok(css.includes("@media (prefers-color-scheme: light)"));
  assert.ok(css.includes('[data-theme="dark"]'));
});
