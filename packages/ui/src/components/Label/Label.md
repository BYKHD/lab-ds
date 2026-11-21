# Label

The visible name of a form control.

## When to use

- For every form control that has no other visible name: `Input`, `Textarea`, `Checkbox`, `InputOTP`.
- Linked to its control (`htmlFor` matching the control's `id`), so clicking the label focuses or toggles the control and screen readers read it out.

## When not to use

- Inside a `Field`. Use `FieldLabel`, which is a Label with Field spacing.
- For a heading over a group of controls. Use `FieldLegend` inside a `FieldSet`.
- For help text or instructions. Use `FieldDescription`.

## Rules

- Short, in sentence case, no colon: "Project name", not "Project Name:".
- Put it above text inputs, and to the right of checkboxes.
- Never replace it with a placeholder.

## Props and variants

There are no variants and one size (small, medium-weight text).

It accepts every native label prop; `htmlFor` is the important one.

It dims to half opacity when its control is disabled, as long as the label comes after the control or sits inside a disabled `Field`.

TODO: when the label comes before a disabled control (the usual order for inputs), it does not dim. Confirm whether that's intended.

## Tokens used

Label sets no color tokens of its own; it uses the surrounding text color.

## Example

From the `Default` story:

```tsx
import { Input, Label } from "lab-ds"

<Label htmlFor="name">Project name</Label>
<Input id="name" />
```

The stories also show `Disabled`.
