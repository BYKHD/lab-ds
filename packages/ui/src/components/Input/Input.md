# Input

A single-line text box for short answers such as a name, an email address, or a number.

## When to use

- For short, single-line answers.
- With a matching `type` (`email`, `tel`, `number`, `password`, `search`, `file`) so phones show the right keyboard and browsers can autofill.

## When not to use

- For answers longer than one line. Use `Textarea`.
- When the input needs an icon, prefix, suffix, or button inside it. Use `InputGroup`.
- For one-time codes. Use `InputOTP`.
- For picking from a fixed list or a yes/no choice. Use `Checkbox`. TODO: lab-ds has no select, radio, or combobox yet.

## Rules

- Always give it a visible label (use `Field`, or `Label`). A placeholder is not a label.
- Use the placeholder only for an example of the format, if at all.
- Set `autocomplete` for personal details (name, email, address) so browsers can fill them in.
- Show errors with `aria-invalid` and a `FieldError` message.

## Props and variants

There are no visual variants and one size (32px tall). It fills the width of its container.

It accepts every native input prop. The ones that change how it looks:

| Prop | Values | What it does |
| --- | --- | --- |
| `disabled` | `true`, `false` | Greyed out and can't be focused or changed. |
| `aria-invalid` | `true`, `false` | Red border. |
| `type="file"` | | Shows a file picker button inside the box. |

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
import { Input, Label } from "@bykhd/lab-ds"

<Label htmlFor="project">Project name</Label>
<Input id="project" placeholder="Website redesign" />
```

The stories also show `Disabled`, `Invalid`, and `File`.
