# Button

Triggers an action: submit a form, open a dialog, save, delete. For moving to another page, use a link (or a link styled as a button; see [Links that look like buttons](#links-that-look-like-buttons)).

```tsx
import { Button } from "lab-ds"

<Button onClick={save}>Save changes</Button>
```

Built on Base UI's [`Button`](https://base-ui.com/react/components/button), so it renders a native `<button>` and accepts every native button prop (`type`, `disabled`, `onClick`, `aria-*`, …).

## Quick rules

These are the rules to check every Button against. They're written to be followed literally by people and by LLM agents.

1. **One `default` (primary) Button per view or section.** Everything else is `secondary`, `outline`, or `ghost`.
2. **Pick the variant by importance, not by color.** Use the [variant table](#variants) below.
3. **Destructive actions:** `danger` for the main action that confirms something irreversible, `variant="destructive"` for a less prominent destructive action. See [Danger vs destructive](#danger-vs-destructive).
4. **`danger` only goes with `variant="default"`.** It has no styling on any other variant.
5. **Use `sm`, `default`, or `lg`.** `xs` / `icon-xs` exist for dense UI but sit outside the Figma scale.
6. **Icon-only Buttons need an `aria-label`.**
7. **Labels are verbs:** "Save changes", "Delete project", not "OK" or "Yes".
8. **Set `type="submit"` explicitly** on a form's submit Button, and `type="button"` on other Buttons inside a `<form>`.
9. **Don't hard-code colors, heights, or radii in `className`.** If a variant doesn't fit, change the tokens in `theme.css` or add a variant; don't override per call site.
10. **Navigation is a link, not a Button with `onClick={() => router.push(...)}`.**

## Variants

| `variant` | Emphasis | Use for | Example |
| --- | --- | --- | --- |
| `default` | Highest | The main action of a view, form, or dialog. One per section. | "Save changes", "Create project" |
| `secondary` | High | An important action next to the primary, or the main action where solid primary would be too loud. | "Save draft" |
| `outline` | Medium | Neutral actions; the cancel/back action next to a primary. | "Cancel", "Export" |
| `ghost` | Low | Toolbars, table rows, repeated actions, icon buttons where a border adds noise. | Row "Edit" icon, toolbar actions |
| `destructive` | Medium | A destructive action that isn't the main focus. | "Delete" in a settings row, "Remove member" |
| `link` | Lowest | An inline action in text or a dense footer that should read like a link but performs an action. | "Resend code" |

Figma mapping (from `btn/color/*` in the Component collection): `default` → Primary, `secondary` → Secondary, `outline` → Default, `ghost` → Ghost, `destructive` → Secondary Danger, `link` → Tertiary, `default` + `danger` → Primary Danger.

### Danger vs destructive

| | `danger` (on `variant="default"`) | `variant="destructive"` |
| --- | --- | --- |
| Look | Solid red | Subtle red background, red text and border |
| Use for | The **primary** action that commits an irreversible change, usually the confirm button in a dialog | A **secondary** destructive action that starts the flow, or a destructive action that isn't the page's focus |
| Example | Dialog: "Delete project" (confirm) | Settings row: "Delete project…" (opens the dialog) |

```tsx
// Settings page: starts the flow
<Button variant="destructive" onClick={openDialog}>Delete project…</Button>

// Confirmation dialog: commits it
<Button variant="outline" onClick={close}>Cancel</Button>
<Button danger onClick={deleteProject}>Delete project</Button>
```

Don't:

- `<Button variant="outline" danger>`: `danger` does nothing on non-default variants.
- Use `danger` for actions that are undoable (archive, hide). Use `outline` or `secondary`.
- Put two red Buttons side by side.

## Sizes

| `size` | Figma | Use for |
| --- | --- | --- |
| `lg` | Large | Hero CTAs, marketing pages, mobile primary actions |
| `default` | Medium | Most forms, dialogs, and pages |
| `sm` | Small | Compact layouts, cards, inline with inputs of size `sm` |
| `xs` | not in Figma | Dense UI only (toolbars, table cells, button groups). **Prefer `sm`.** |

Icon-only sizes are square and match the text sizes: `icon-lg`, `icon` (= `default`), `icon-sm`, `icon-xs`.

> `xs` and `icon-xs` use fixed Tailwind values (`h-6`, `rounded-sm`, `size-3` icons) instead of design tokens, so they won't follow token changes. Use them only when `sm` doesn't fit.

Keep Buttons that sit together the same size. Match the Button size to the size of inputs in the same row.

## Icons

Pass an SVG icon as a child. The Button sizes it for you per `size`; add your own `size-*` class to override.

```tsx
import { IconPlus, IconArrowRight } from "@tabler/icons-react"

<Button>
  <IconPlus data-icon="inline-start" />
  New item
</Button>

<Button variant="outline">
  Continue
  <IconArrowRight data-icon="inline-end" />
</Button>
```

- Mark the icon's position with `data-icon="inline-start"` or `data-icon="inline-end"`, so padding stays balanced.
- Leading icons reinforce the action (plus for create). Trailing icons show direction (arrow for next step, chevron for menus).
- At most one icon per Button with a label.

### Icon-only Buttons

Use an `icon*` size and always give an accessible name:

```tsx
<Button variant="ghost" size="icon" aria-label="Delete row">
  <IconTrash />
</Button>
```

Pair with a tooltip when the icon's meaning isn't obvious.

## States

The Button styles these automatically. Don't recreate them with classes.

| State | How to get it | Notes |
| --- | --- | --- |
| Hover / pressed | Pointer | Pressed also nudges the Button down 1px (not for Buttons with `aria-haspopup`). |
| Focus | Keyboard | Visible focus ring (`focus-visible`). Never remove it. |
| Disabled | `disabled` | Not clickable, removed from tab order. Add `focusableWhenDisabled` if users need to reach it (e.g. to read a tooltip explaining why). |
| Invalid | `aria-invalid` | Red border and ring. For Buttons acting as form controls (e.g. a picker trigger). |
| Expanded | `aria-expanded` | Keeps the hover background while a menu or popover it controls is open (`outline`, `secondary`, `ghost`). |

**No built-in loading state.** While an action runs, set `disabled` and change the label (e.g. "Saving…"), or put a spinner icon in the `inline-start` slot.

Prefer explaining why an action is unavailable over silently disabling it.

## Content

- Start with a verb and say what happens: "Save changes", "Send invite", "Delete project".
- Sentence case, no trailing punctuation. Use "…" only when the Button opens a step that asks for more input or confirmation ("Delete project…").
- Keep it short: 1–3 words. Buttons don't wrap (`whitespace-nowrap`).
- Use the same verb in the trigger and the confirm Button: "Delete project…" → "Delete project", not "Yes".

## Layout

- In dialogs and forms, put the primary action last (right side in LTR): `Cancel` then `Save`.
- Space Buttons with your layout's gap utilities; don't add margins to the Button.
- To make a Button full width, add `className="w-full"`. Layout utilities (`w-full`, margins, `self-*`) in `className` are fine; color, height, and radius overrides are not.

## Links that look like buttons

For navigation, render a link. Two options:

```tsx
import Link from "next/link"
import { Button, buttonVariants } from "lab-ds"

// 1. Style any element with buttonVariants (preferred for Next.js Link)
<Link href="/projects/new" className={buttonVariants({ size: "lg" })}>
  New project
</Link>

// 2. Base UI render prop (this library uses `render`, not `asChild`)
<Button render={<a href="/docs" />} nativeButton={false} variant="outline">
  Read the docs
</Button>
```

`buttonVariants({ variant, size, danger })` takes the same style props as `Button` and returns a class string.

## API

```ts
type ButtonProps = ButtonPrimitive.Props & {
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link" // default: "default"
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" // default: "default"
  danger?: boolean // default: false; styled only with variant="default"
}
```

Exports: `Button`, `buttonVariants`, and the types `ButtonVariant`, `ButtonSize`, `ButtonStyleProps`.

Rendered data attributes, for tests and parent selectors: `data-slot="button"`, `data-variant`, `data-size`, `data-danger` (present only when `danger`).

`className` merges after the variant classes, and component styles live in `@layer components`, so Tailwind utilities passed in `className` win.

## Accessibility

- Renders a native `<button>`: Enter and Space activate it, and it's in the tab order.
- Every Button needs an accessible name: visible text, or `aria-label` for icon-only Buttons.
- Don't put interactive elements inside a Button.
- Focus ring uses `primary-border-strong` with an offset; don't hide it with `outline-none` or `ring-0`.
- Color is never the only signal: destructive Buttons also say what they destroy in their label.

## For contributors

- Source: `Button.tsx`, styles in `Button.module.css` (CSS-module classes per variant/size, not `cva`).
- All colors, heights, paddings, and radii come from tokens in `src/styles/theme.css` except the `xs` sizes.
- Used internally by `Dialog` and `InputGroup`; check them when changing variants or sizes.
- Stories: `Button.stories.tsx` (Default, Variants, Sizes, WithIcon, Danger, Disabled, Invalid, Focused). Tests: `Button.test.tsx`.
- Removing or renaming a variant, size, or prop is a **major** version change.
