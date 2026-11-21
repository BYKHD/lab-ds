# Button

Triggers an action, such as submitting a form, opening a dialog, saving, or deleting.

## When to use

- For any action on the current page: "Save changes", "Create project", "Delete project…".
- To submit a form or confirm a dialog.
- To open a dialog or menu.

## When not to use

- To go to another page. Use a link, styled as a button if it needs to look like one.
- For a status or label that does nothing when clicked. Use `Badge`.
- For an on/off choice. Use `Checkbox`.
- Inside running text when the action should read like a link. Use the `link` variant, or a real link if it navigates.

## Rules

1. **One `default` (primary) Button per view or section.** Everything else is `secondary`, `outline`, or `ghost`.
2. **Pick the variant by importance, not by color.** See the variant table below.
3. **Destructive actions:** `danger` for the main action that confirms something irreversible, `variant="destructive"` for a less prominent destructive action.
4. **`danger` only works with `variant="default"`.** It has no effect on any other variant.
5. **Use `sm`, `default`, or `lg`.** `xs` exists for dense UI but is outside the Figma scale.
6. **Icon-only Buttons need an `aria-label`** that says what they do.
7. **Labels are verbs** that say what happens: "Save changes", "Delete project", not "OK" or "Yes".
8. **Use the same verb in the trigger and the confirm Button:** "Delete project…" opens a dialog whose confirm Button says "Delete project".
9. **Sentence case, 1–3 words, no trailing punctuation.** Use "…" only when the Button opens a step that asks for more input or confirmation. Labels never wrap.
10. **Primary action last** (on the right) in dialogs and forms: Cancel, then Save.
11. **Buttons in the same row share a size**, and match the size of inputs beside them.
12. **Don't change colors, heights, or corners per Button.** If no variant fits, change the tokens or ask for a new variant.

## Props and variants

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `default`, `secondary`, `outline`, `ghost`, `destructive`, `link` | `default` |
| `size` | `xs`, `sm`, `default`, `lg`, `icon-xs`, `icon-sm`, `icon`, `icon-lg` | `default` |
| `danger` | `true`, `false` | `false` |
| `disabled` | `true`, `false` | `false` |

### Variants

| `variant` | Emphasis | Use for | Example | Figma name |
| --- | --- | --- | --- | --- |
| `default` | Highest | The main action of a view, form, or dialog. One per section. | "Save changes" | Primary |
| `secondary` | High | An important action next to the primary, or the main action where a solid primary would be too loud. | "Save draft" | Secondary |
| `outline` | Medium | Neutral actions; Cancel or Back next to a primary. | "Cancel", "Export" | Default |
| `ghost` | Low | Toolbars, table rows, repeated actions, icon buttons where a border adds noise. | Row "Edit" icon | Ghost |
| `destructive` | Medium | A destructive action that isn't the main focus, or that starts a destructive flow. | "Delete project…" in settings | Secondary Danger |
| `link` | Lowest | An inline action that should read like a link. | "Resend code" | Tertiary |
| `default` + `danger` | Highest | The confirm Button that commits an irreversible change, usually in a dialog. | "Delete project" | Primary Danger |

Don't:

- Put `danger` on any variant except `default`. It does nothing there.
- Use `danger` for actions that can be undone (archive, hide). Use `outline` or `secondary`.
- Put two red Buttons side by side.

### Sizes

| `size` | Height | Figma | Use for |
| --- | --- | --- | --- |
| `lg` | 48px | Large | Hero actions, marketing pages, main actions on mobile |
| `default` | 40px | Medium | Most forms, dialogs, and pages |
| `sm` | 32px | Small | Compact layouts, cards, next to small inputs |
| `xs` | 24px | not in Figma | Dense UI only (toolbars, table cells). Prefer `sm`. |

Icon-only sizes are square and match the text sizes: `icon-lg` (48px), `icon` (40px), `icon-sm` (32px), `icon-xs` (24px).

TODO: `xs` and `icon-xs` don't use design tokens for height, corners, or icon size, so they won't follow token changes.

### Icons

- An icon can sit before the label (to reinforce the action, like a plus for "New") or after it (to show direction, like an arrow for "Continue").
- At most one icon per Button with a label.
- Icons are sized to match the Button.

### States

The Button shows these on its own:

| State | When | Notes |
| --- | --- | --- |
| Hover / pressed | Pointer | Pressed nudges the Button down 1px. |
| Focus | Keyboard | A visible focus ring. Never hide it. |
| Disabled | `disabled` | Can't be clicked or reached with Tab. Prefer explaining why an action is unavailable over silently disabling it. |
| Invalid | `aria-invalid` | Red border and ring, for a Button that acts as a form control (e.g. a picker). |
| Expanded | While a menu it opens is shown | Keeps the hover color (`outline`, `secondary`, `ghost`). |

There is no loading state. While an action runs, disable the Button and change its label ("Saving…").

## Tokens used

| Token group | Where |
| --- | --- |
| `--color-cta-foreground-primary-*`, `--color-cta-border-primary-*`, `--color-on-cta-content-primary-*` | `default` fill, border, and text (default, hover, pressed, disabled) |
| `--color-danger-foreground-*`, `--color-on-danger-content-high` | `default` + `danger` fill and text |
| `--color-cta-foreground-secondary-*`, `--color-cta-border-secondary-*`, `--color-on-cta-content-secondary-*` | `secondary` |
| `--color-base-foreground-action-*`, `--color-on-base-border-*`, `--color-on-base-content-high` | `outline`, and `ghost` hover |
| `--color-base-foreground-disable`, `--color-on-base-content-disable` | Disabled `outline`, `ghost`, `link` |
| `--color-danger-foreground-subtle-*`, `--color-danger-border-*`, `--color-danger-content-*` | `destructive` |
| `--color-on-cta-content-tertiary-default` | `link` text |
| `--color-primary-border-strong` | Focus ring |
| `--color-danger-border-strong` | Invalid border and ring |
| `--radius-comp-cta` (0.5rem) | Corners |
| `--shadow-comp-cta` | Shadow on `default` |
| `--spacing-comp-*`, `--spacing-pad-*`, `--spacing-inner-md` | Heights, minimum widths, padding, icon gap |
| `--text-cta-s`, `--text-cta-m`, `--text-cta-l`, `--font-weight-cta-normal`, `--tracking-cta`, `--font-cta` | Label text for `sm`, `default`, `lg` |

All color tokens have dark-mode values and switch automatically.

## Example

From the `Sizes` story: an icon-only Button, named with `aria-label`.

```tsx
import { IconPlus } from "@tabler/icons-react"
import { Button } from "lab-ds"

<Button size="icon" aria-label="Add">
  <IconPlus />
</Button>
```

The stories also show `Default`, `Variants`, `WithIcon`, `Danger`, `Disabled`, `Invalid`, and `Focused`. For a `danger` Button in a confirmation dialog, see the `DestructiveConfirmation` story under Dialog.
