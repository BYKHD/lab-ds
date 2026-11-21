# Textarea

A multi-line text box for longer answers such as a comment, a description, or notes.

## When to use

- When the answer may be more than one line.
- When people need to see what they've written while they write it.

## When not to use

- For short, single-line answers. Use `Input`.
- When the box needs buttons or a toolbar attached. Use `InputGroup` with `InputGroupTextarea`.

## Rules

- Always give it a visible label (use `Field`, or `Label`). A placeholder is not a label.
- If there's a length limit, say so in the help text, and set it well above what most people need. TODO: lab-ds has no character counter yet.
- Show errors with `aria-invalid` and a `FieldError` message.

## Props and variants

There are no visual variants and one size. It fills the width of its container, starts about three lines tall (64px), and grows as the user types.

It accepts every native textarea prop. The ones that change how it looks:

| Prop | Values | What it does |
| --- | --- | --- |
| `disabled` | `true`, `false` | Greyed out and can't be changed. |
| `aria-invalid` | `true`, `false` | Red border. |

## Tokens used

| Token | Where |
| --- | --- |
| `--color-base-foreground-action` / `-hover` | Background, and on hover |
| `--color-on-base-border-default` | Border |
| `--color-on-base-content-high` | Text |
| `--color-on-base-content-low` | Placeholder |
| `--color-primary-border-strong` | Focus border and ring |
| `--color-base-foreground-disable`, `--color-on-base-border-disable`, `--color-on-base-content-low`, `--color-on-base-content-disable` | Disabled background, border, text, placeholder |
| `--color-danger-border-strong` / `--color-danger-border-default` | Invalid border, and on hover |
| `--radius-comp-input` (0.5rem) | Corners |

All color tokens have dark-mode values and switch automatically.

## Example

From the `Default` story:

```tsx
import { Label, Textarea } from "lab-ds"

<Label htmlFor="notes">Notes for reviewers</Label>
<Textarea id="notes" placeholder="What should reviewers look at first?" />
```

The stories also show `Disabled` and `Invalid`.
