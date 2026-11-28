# Field

Lays out one form control with its label, help text, and error message, and groups related fields.

## When to use

- Around every form control (`Input`, `Textarea`, `Checkbox`, `InputGroup`, `InputOTP`) so the label, help text, and error line up the same way everywhere.
- To group related controls (a set of checkboxes, an address) under one heading with `FieldSet` and `FieldLegend`.

## When not to use

- For an error about the whole form, not one field. Use `Alert` above the form.
- For layout that has no form control in it. Use layout spacing.

## Rules

- Every control needs a visible label. A placeholder is not a label: it disappears as soon as the user types.
- Labels are short, in sentence case, with no colon.
- Help text (`FieldDescription`) is one short sentence. Show it before the user makes a mistake, not only after.
- Error messages (`FieldError`) say what to do: "Enter an email address like name@example.com", not "Invalid input".
- When a field has an error, mark its control with `aria-invalid` so it turns red too, and link the message to the control.
- TODO: decide how required and optional fields are marked.

## Parts

| Part | What it is |
| --- | --- |
| `Field` | One control with its label and text. |
| `FieldLabel` | The label for the control. Wrapping a whole `Field` in it turns the row into a selectable card that highlights when checked. |
| `FieldTitle` | A label-styled title when the control has its own label elsewhere. |
| `FieldContent` | Stacks a label and description next to a checkbox in a horizontal Field. |
| `FieldDescription` | Help text in a muted color. Links inside are underlined. |
| `FieldError` | The error message, in red. Shows nothing when it has no message. Screen readers announce it when it appears. |
| `FieldGroup` | Stacks several Fields with even spacing. |
| `FieldSet` | Groups related Fields. |
| `FieldLegend` | The heading of a `FieldSet`. |
| `FieldSeparator` | A divider line between groups, optionally with text in the middle ("Or continue with"). |

## Props and variants

| Part | Prop | Values | Default | What it does |
| --- | --- | --- | --- | --- |
| `Field` | `orientation` | `vertical`, `horizontal`, `responsive` | `vertical` | `vertical`: label above the control. `horizontal`: label beside the control (use for checkboxes). `responsive`: vertical in narrow containers, horizontal in wider ones. |
| `FieldLegend` | `variant` | `legend`, `label` | `legend` | `legend` is base size; `label` is smaller, to match a field label. |
| `FieldError` | `errors` | list of messages | not set | Shows one message as text, several as a bullet list; repeats are removed. |

## Tokens used

| Token | Where |
| --- | --- |
| `--color-on-base-content-high` | Legend text |
| `--color-on-base-content-medium` | Help text, separator text |
| `--color-primary-content-default` | Link hover in help text |
| `--color-danger-content-default` | Error text, and the whole Field when invalid |
| `--color-primary-border-default`, `--color-primary-foreground-subtle` | Selectable card when checked |
| `--color-base-foreground-action-hover` | Selectable card on hover |
| `--color-primary-border-strong` | Selectable card focus ring |
| `--color-base-foreground-ground`, `--color-base-foreground-card` | Background behind separator text (page or card) |
| `--radius-lg` | Selectable card corners |

Label text uses the `Label` component's styles. All color tokens have dark-mode values and switch automatically.

## Example

From the `WithError` story:

```tsx
import { Field, FieldError, FieldLabel, Input } from "@bykhd/lab-ds"

<Field data-invalid="true">
  <FieldLabel htmlFor="email-err">Email</FieldLabel>
  <Input id="email-err" type="email" defaultValue="you@" aria-invalid aria-describedby="email-err-msg" />
  <FieldError id="email-err-msg">Enter an email address like name@example.com.</FieldError>
</Field>
```

The stories also show `Default` (label, input, help text) and `FieldSetWithLegend` (a group of checkboxes).
