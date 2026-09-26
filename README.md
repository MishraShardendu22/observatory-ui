# observatory-ui

The design system of the [GitHub Backup Automation System](https://github.com/MishraShardendu22/github-backup-automation-system),
as two packages any web app can install:

| Package | What | Install |
| --- | --- | --- |
| [`@mishrashardendu22/observatory-tokens`](packages/tokens) | Colours (dark first, light by device preference), type, spacing, radii, shadows and layout as CSS custom properties, a Tailwind v4 theme and a typed object. The only package a React Native app shares. | `packages/tokens` |
| [`@mishrashardendu22/observatory-ui`](packages/ui) | React components and the stylesheet: buttons, cards, stat cards, badges, tables, forms, notices, navigation and page chrome. | `packages/ui` |

## Install from a release

Every `v*` tag builds both packages and attaches their tarballs to a GitHub
release, so an app installs them with one command and no registry token:

```bash
pnpm add \
  https://github.com/MishraShardendu22/observatory-ui/releases/download/v0.3.0/mishrashardendu22-observatory-tokens-0.3.0.tgz \
  https://github.com/MishraShardendu22/observatory-ui/releases/download/v0.3.0/mishrashardendu22-observatory-ui-0.3.0.tgz
```

The same workflow publishes to npm when the repository has an `NPM_TOKEN`
secret; from then on `pnpm add @mishrashardendu22/observatory-ui` works too.

## Develop

```bash
corepack enable
pnpm install
pnpm verify        # biome, tsc, token tests, and that dist/ matches tokens.json
pnpm build         # regenerate packages/tokens/dist from tokens.json
pnpm run pack:release          # the two tarballs a release attaches, under release/
```

`packages/tokens/tokens.json` is the source of truth for every value. Edit it,
run `pnpm build`, commit `dist/` with it. The brand book that explains the
tokens (contrast notes, when to use what) lives in the Observatory design
system; each token also carries a `usage` note in the JSON.

## Release

```bash
# bump both package versions, then
git tag v0.3.0 && git push origin v0.3.0
```

The release workflow verifies, packs, creates the GitHub release with the two
tarballs, and publishes to npm if `NPM_TOKEN` is set.

## Consumers

- `github-backup-dashboard` (Next.js 16) in the main repository.
- Planned: the docs site and a mobile monitor (tokens only).
