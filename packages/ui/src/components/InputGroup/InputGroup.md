# InputGroup

A text box with icons, fixed text, or buttons attached inside its border.

## When to use

- To add an icon that explains the field, such as a search icon.
- To show fixed text the user doesn't type, such as `https://` or a currency or unit.
- To attach a small action to the field, such as "Copy" or "Clear".
- For a comment box with actions under the text (`InputGroupTextarea` with a bottom addon).

## When not to use

- For a plain text box. Use `Input` or `Textarea`.
- For the form's main submit action. Put a `Button` after the field instead.
- For several actions. Keep it to one or two small buttons.
- As a replacement for a label. The field still needs a visible label or, at minimum, an `aria-label`.

## Parts

| Part | What it is |
| --- | --- |
| `InputGroup` | The bordered box that holds everything. |
| `InputGroupInput` | The single-line text box inside. |
| `InputGroupTextarea` | A multi-line text box inside, instead of the input. |
| `InputGroupAddon` | A slot for an icon, text, or button. Clicking an empty part of it focuses the input. |
| `InputGroupText` | Muted text inside an addon. |
| `InputGroupButton` | A small `Button` sized to fit inside the box. |

## Props and variants

| Part | Prop | Values | Default | What it does |
| --- | --- | --- | --- | --- |
| `InputGroupAddon` | `align` | `inline-start`, `inline-end`, `block-start`, `block-end` | `inline-start` | Before the text, after the text, above it, or below it. |
| `InputGroupButton` | `size` | `xs`, `sm`, `icon-xs`, `icon-sm` | `xs` | Use `icon-*` sizes for icon-only buttons, with an `aria-label`. |
| `InputGroupButton` | `variant` | Same as `Button` | `ghost` | Keep `ghost` in a row; `default` is fine for a single "Post" or "Send" action below a textarea. |

The box is 32px tall, or grows when it holds a textarea or a top/bottom addon. Disabled and invalid states come from the input inside (`disabled`, `aria-invalid`).

## Tokens used

| Token | Where |
| --- | --- |
| `--color-base-foreground-action` | Background |
| `--color-on-base-border-default` | Border |
| `--color-on-base-content-medium` | Addon icons and text |
| `--color-primary-border-strong` | Focus border and ring |
| `--color-base-foreground-disable`, `--color-on-base-border-disable` | Disabled background and border |
| `--color-danger-border-strong` | Invalid border and ring |
| `--radius-comp-input` (15rem, fully rounded) | Corners; a group holding a `textarea` uses `--radius-md` (0.5rem) instead |

Text inside uses the `Input` / `Textarea` tokens and buttons use the `Button` tokens. All color tokens have dark-mode values and switch automatically.

## Example

From the `WithButton` story:

```tsx
import { IconCopy } from "@tabler/icons-react"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@bykhd/lab-ds"

<InputGroup>
  <InputGroupInput readOnly defaultValue="https://example.com/invite/8f2k" aria-label="Invite link" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" aria-label="Copy link">
      <IconCopy />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

The stories also show `Default` (search icon), `WithText` (prefix and suffix), and `WithTextarea`.
