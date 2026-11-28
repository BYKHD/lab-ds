---
name: review-ui
description: Review UI changes against the component guidelines and AGENTS.md; reports pass, fail or can't check per checklist item, with file:line evidence.
disable-model-invocation: true
argument-hint: "[base ref, default: merge-base with main]"
---

# Review UI

This is a **read-only audit**. Your tools are reading tools: `git diff`, `git log`, `git show`, Read, Grep. The report is the only thing you produce. Every finding goes into it, including fixes you would suggest; the files stay exactly as you found them. Never edit, write, format, build or install.

## Verdicts

Every checklist item gets exactly one verdict:

- **pass**: you checked the changed files the item covers and found nothing that breaks it. Cite what you checked (`file:line`). If the diff touches nothing the item covers, it is a pass with the evidence "out of scope: no <kind of file> in the diff".
- **fail**: cite every breaking `file:line` and quote the line, plus the rule it breaks (`AGENTS.md:line` or `<Name>.md:line`).
- **can't check**: the evidence needs something a read-only review cannot get (a build, a browser, a running test). Say what is missing and the command that would settle it.

An item without `file:line` evidence has no verdict yet.

## Steps

### 1. Fix the change set

Base is `$ARGUMENTS`, or `git merge-base HEAD main` when empty. The change set is `git diff <base>` (committed plus uncommitted work) and `git status --short` for untracked files. List every changed file. Done when you hold the full file list and know which components (`packages/ui/src/components/<Name>/`) it touches.

### 2. Load the rules

Read `AGENTS.md`, then `<Name>.md` for every touched component **and** every component a changed file imports or renders (e.g. `Button` inside `Dialog`). Done when each of those guidelines has been read in this run, or noted as missing.

### 3. Run the checklist

Apply each item to the change set, in order. The section in brackets is where the rule lives in `AGENTS.md`; quote that line as the rule.

1. **Guideline followed.** Each changed component and each use of another component follows its `<Name>.md`. [Component guidelines]
2. **Guideline in sync.** An added, removed or renamed variant, size, prop or export, or a changed behaviour, state or default that the `.md` describes, is reflected in that `.md` in this diff. [Component guidelines]
3. **Stories in sync.** A changed `.md` comes with a changed `<Name>.stories.tsx`; the stories import `./<Name>.md?raw` into `parameters.docs.description.component`; every example and story name the `.md` mentions exists in the stories. [Component guidelines]
4. **Folder shape.** Each component is `<Name>.tsx` + `<Name>.module.css` + `index.ts`, with stories, test and `.md` beside it. [Layout]
5. **CSS module shape.** Each `.module.css` opens with `@reference "../../styles/reference.css";` and wraps rules in `@layer components` using `@apply`. [Architecture]
6. **Variants and class merging.** Variants are CSS-module classes picked by prop (`styles[variant]`) or data attributes; classes merge through `cn` from `src/lib/utils.ts`. Any `cva` import is a fail. [Architecture]
7. **Tokens.** Colours, radii and spacing in components come from token variables or Tailwind utilities; new or changed tokens live in `src/styles/theme.css`. A hard-coded value in a component is a fail. [Architecture]
8. **Base UI primitives.** Primitives come from `@base-ui/react` and composition uses the `render` prop. Any Radix import or `asChild` is a fail. [intro]
9. **Client boundary.** Every component using hooks, state, refs or event handlers starts with `"use client"`; `packages/ui/tsup.config.ts` still sets the `"use client"` banner; no `next/*` import anywhere in `packages/ui`. Whether built `dist/index.js` starts with the banner is can't check (needs `npm run build`). [Architecture]
10. **Public API.** A new or renamed component is exported from `packages/ui/src/index.ts`; `react`/`react-dom` stay `peerDependencies`; `exports` and `sideEffects` in `packages/ui/package.json` are intact. [Architecture]
11. **Coverage.** Each touched component has a Default story plus stories for the variants and states the diff adds; changed behaviour has a `*.test.tsx` case. Whether they pass is can't check (needs `npm test`). [Testing]
12. **Semver signal.** A removed or renamed export, prop or token is flagged as a **major** change in the report. [Releasing]
13. **AGENTS.md current.** A change to setup, scripts, layout or the component list is reflected in `AGENTS.md`. [Status, Commands]

Done when all 13 items carry a verdict with evidence.

### 4. Report

```
## UI review: <base>..HEAD (<n> files)

| # | Item | Verdict | Evidence |
|---|------|---------|----------|
| 1 | Guideline followed | fail | Dialog.tsx:42 `<Button asChild>`; Button.md:18 "use render" |
...

### Fails
<per fail: file:line, the quoted line, the rule, the suggested fix>

### Can't check
<per item: what is missing, the command that settles it>
```

Finish when the table has 13 rows, each with a verdict and evidence.
