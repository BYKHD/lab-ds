# AGENTS.md

`lab-ds` is a public React + TypeScript design system published to npm as **`lab-ds`**. Components are built on shadcn/ui's `base-nova` style (**Base UI** primitives, `@base-ui/react`, not Radix; use the `render` prop instead of `asChild`) styled with Tailwind CSS v4, and the library targets **Next.js apps** as its main consumer.

This file overrides the curriculum `AGENTS.md` two folders up. That file says there is no code; this folder holds the code.

> **Status:** `packages/ui` is scaffolded with the 14 Daidai components from `week-1-lab` (Week 1), plus `Tabs` from shadcn base-nova. `apps/storybook` is set up (Week 2), and every component has stories and a `<Name>.md` usage guideline. Publishing is Week 4. When you change the setup, update this file so the commands match the real `package.json` scripts.

## Layout (npm workspaces)

- `package.json` at the root declares `workspaces` and holds the root scripts. Run every command from the root.
- `packages/ui/` is the published package (`lab-ds`). Components live in `src/components/<Name>/` as `<Name>.tsx` + `<Name>.module.css` + `index.ts`, and each `*.stories.tsx`, `*.test.tsx`, and `<Name>.md` (usage guideline) file sits beside its component.
- `apps/storybook/` is the review app (Storybook 10, `@storybook/react-vite`). It is private and never published. Its `.storybook/main.ts` reads stories from `packages/ui/src/**/*.stories.tsx` and adds `@tailwindcss/vite` so the CSS modules compile live. `.storybook/preview.css` imports Tailwind plus the *source* `theme.css` (not `dist/`), so stories render with real tokens without a rebuild. The toolbar's Theme switch toggles `.dark` on `<html>`.

## Component guidelines

- **Before implementing anything that touches a component, read its `src/components/<Name>/<Name>.md` first, every time.** That covers changing the component itself, writing its stories or tests, and using it inside another component (e.g. `Button` in `Dialog`). Follow its rules over general habits. If there is no `.md` for that component yet, go by the source and stories.
- **Keep the `.md` in sync with the code.** When a change adds, removes, or renames a variant, size, prop, or export, or changes behaviour, a state, or a default that the `.md` describes, update the `.md` in the same change. A guideline that contradicts the code is a bug.
- **When the `.md` changes, update `<Name>.stories.tsx` in the same change.** The stories show the guideline on the Storybook docs page (`import guideline from "./<Name>.md?raw"`, passed as `parameters.docs.description.component`), so a component with a `.md` must have that import. The `.md`'s example and the story names it mentions must match the stories: if the guideline adds or changes an example, variant, or state, add or update the story for it.

## Commands

```bash
npm install
npm run build                       # → npm run build -w packages/ui (tsup: ESM + .d.ts, plus dist/styles.css)
npm run typecheck -w packages/ui    # tsc --noEmit
npm run storybook                   # → npm run storybook -w apps/storybook
npm run build-storybook
npm test                            # Vitest (root vitest.config.ts): unit (jsdom) + storybook (Chromium via Playwright) projects
npx vitest run packages/ui/src/components/Button/Button.test.tsx -t "renders"   # one test
npx vitest run --project=storybook  # story tests only
npx vitest run --project=unit       # *.test.tsx only
npm pack --dry-run -w packages/ui   # check what would ship
```

## Architecture

- **shadcn components are copied in, not installed.** There is no `packages/ui/components.json` yet; add one (style `base-nova`, relative aliases) before using `npx shadcn@latest add <name>` inside `packages/ui`. The CLI writes flat files with stock Tailwind classes and overwrites existing files, so convert the output to the folder + CSS-module shape and check the diff for local edits. Variants are CSS-module classes picked by prop (`styles[variant]`) or data attributes, not `cva`. Classes merge through `cn` from the `cn` npm package (`src/lib/utils.ts` re-exports it).
- **Styles live in CSS modules.** Each `<Name>.module.css` starts with `@reference "../../styles/reference.css";` (build-only: Tailwind + `shadcn/tailwind.css` + tokens) and wraps rules in `@layer components` using `@apply`. tsup runs them through `postcss.config.mjs` (Tailwind) and esbuild's `local-css` loader, so class names come out scoped (`Button_root`).
- **Tokens are CSS variables.** They live in `src/styles/theme.css`, with Tailwind v4's CSS-first `@theme` mapping them to utilities (no `tailwind.config.js`). Dark mode switches on the `.dark` class. Change a token there, never as a hard-coded value inside a component.
- **CSS contract for consumers:** `lab-ds/styles.css` = `theme.css` (tokens, `@theme`, `.dark`, base layer, `@import "tw-animate-css"`) followed by the already-compiled component CSS. A Tailwind v4 app imports `tailwindcss` and then `lab-ds/styles.css` in its global CSS. No `@source` is needed, because component styles are precompiled, and the app's Tailwind emits the token variables. The app provides `--font-sans` (e.g. via `next/font`).
- **Next.js / RSC safety:** every component that uses hooks, state, refs, or event handlers starts with `"use client"`. Bundling strips per-file directives, so tsup adds a `"use client"` banner to `dist/index.js`, which makes the whole entry client-side. After each build, check that `dist/index.js` still starts with it. Never import Next.js modules into the library; it must work in any React app.
- **Public API = `packages/ui/src/index.ts` + the `exports` map** in `packages/ui/package.json` (`.` and `./styles.css`). A component that isn't exported there doesn't ship. `react` and `react-dom` are `peerDependencies`. `sideEffects` lists `**/*.css` so tree-shaking keeps the stylesheet. Stories and tests are excluded from the build.

## Testing

- Vitest + Testing Library (jsdom) cover component behaviour (`*.test.tsx`).
- Storybook tests (`@storybook/addon-vitest`) run every story as a test, with interaction tests coming from `play` functions. Each component gets a Default story plus its key variants and states.
- CI (`.github/workflows/ci.yml`) runs on PRs into `main` and `develop`: component file/guideline/export sync, typecheck, unit + storybook tests, build, the `"use client"` banner check, and `npm pack --dry-run`. Keep it in step with the scripts above.

## Releasing (manual)

Publishing is public and can't be undone, so ask the maintainer first.

```bash
npm test && npm run build && npm pack --dry-run -w packages/ui
npm version <patch|minor|major> -w packages/ui
npm publish -w packages/ui --access public
```

Use semver: removing or renaming an export, a prop, or a token is a **major** change.
