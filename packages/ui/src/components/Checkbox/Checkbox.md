# Checkbox

Lets the user turn one option on or off, or pick any number of options from a list.

## When to use

- To pick zero, one, or several options from a list ("Email", "Text message").
- For a single yes/no choice that is submitted with a form, such as "Accept terms and conditions".

## When not to use

- To pick exactly one option from a list. TODO: lab-ds has no radio group yet.
- For a setting that takes effect right away. TODO: lab-ds has no switch yet.
- Without a visible label. Every Checkbox needs text that says what it turns on.

## Rules

- Always pair it with a label (use `Field` with `orientation="horizontal"`). Clicking the label toggles the box.
- Group related checkboxes under one `FieldSet` and `FieldLegend`, and phrase the legend as the question being asked.
- Don't pre-check options for the user unless the default is clearly what most people want.
- Write labels as positive statements: "Send me updates", not "Don't send me updates".

## Props and variants

There are no visual variants and one size (16px square).

| Prop | Values | Default | What it does |
| --- | --- | --- | --- |
| `checked` / `onCheckedChange` | boolean / function | not set | Control the checked state yourself. |
| `defaultChecked` | `true`, `false` | `false` | Start checked without controlling it. |
| `disabled` | `true`, `false` | `false` | Can't be changed; shown at half opacity. |
| `aria-invalid` | `true`, `false` | not set | Shows the red error border and ring. |

TODO: Base UI also supports an indeterminate ("mixed") state for a parent checkbox, but this Checkbox always shows a check mark. Confirm before using it.

## Tokens used

| Token | Where |
| --- | --- |
| `--color-base-foreground-action` | Unchecked fill |
| `--color-on-base-border-default` / `-hover` | Unchecked border, and on hover |
| `--color-primary-foreground-default` / `-hover` | Checked fill and border |
| `--color-on-primary-content-high` | Check mark |
| `--color-primary-border-strong` | Focus border and ring |
| `--color-danger-border-strong` | Invalid border and ring |

The corner radius is a fixed 4px, not a token. All color tokens have dark-mode values and switch automatically.

## Example

From the `WithDescription` story:

```tsx
import { Checkbox, Field, FieldContent, FieldDescription, FieldLabel } from "@bykhd/lab-ds"

<Field orientation="horizontal">
  <Checkbox id="updates" defaultChecked />
  <FieldContent>
    <FieldLabel htmlFor="updates">Product updates</FieldLabel>
    <FieldDescription>One email a month about new features.</FieldDescription>
  </FieldContent>
</Field>
```

The stories also show `Default`, `Disabled`, and `Invalid`. `Field` shows a group of checkboxes in `FieldSetWithLegend`.
