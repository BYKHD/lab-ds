# Badge

A small, non-interactive label that shows the status or category of an item, such as "Paid", "Draft", or "New".

## When to use

- To show a status or category next to an item in a list, table, card, or heading.
- To mark something as new, beta, or changed.
- When the label is one or two words.

## When not to use

- For a message about the page or a section. Use `Alert`.
- For an action. Use `Button`. A Badge looks like a label, so people won't expect to click it.
- For long text or full sentences. The Badge never wraps.
- As the only way to show a status. Color alone isn't enough; the word inside the Badge must say it.
- TODO: confirm whether badges for counts (e.g. "3" unread) are wanted. There is no count or dot style.

## Props and variants

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `default`, `secondary`, `destructive`, `outline`, `ghost`, `link` | `default` |

| `variant` | Look | Use for |
| --- | --- | --- |
| `default` | Solid dark fill, white text | The most important status on the screen |
| `secondary` | Light orange fill, orange text | Highlighted or positive statuses ("Paid", "New") |
| `destructive` | Light red fill, red text | Errors and problems ("Overdue", "Failed") |
| `outline` | Border only, regular text | Neutral statuses ("Draft") |
| `ghost` | No fill or border until hovered | Low-emphasis labels in dense UI |
| `link` | Orange text, underline on hover | A label that is also a link |

TODO: there is no `success` or `warning` variant; confirm which variant to use for those statuses.

There is one size: 20px tall, extra-small medium-weight text, fully rounded.

An icon can sit before or after the text. It is shown at 12px.

## Tokens used

| Token | Where |
| --- | --- |
| `--color-primary-foreground-default` / `-hover` | `default` fill (hover only when it's a link) |
| `--color-on-primary-content-high` | `default` text |
| `--color-secondary-foreground-subtle` / `-subtle-hover` | `secondary` fill |
| `--color-secondary-content-default` | `secondary` text |
| `--color-danger-foreground-subtle` / `-subtle-hover` | `destructive` fill |
| `--color-danger-content-default` | `destructive` text |
| `--color-on-base-border-default` | `outline` border |
| `--color-on-base-content-high` | `outline` and `ghost` text |
| `--color-base-foreground-action-hover` | `outline` hover fill (links only) |
| `--color-base-foreground-inset` | `ghost` hover fill |
| `--color-on-cta-content-tertiary-default` | `link` text |
| `--color-primary-border-strong` | Focus ring |
| `--color-danger-border-strong` | Invalid border and ring |
| `--radius-rounded` | Pill shape |

All color tokens have dark-mode values and switch automatically.

## Example

From the `WithIcon` story:

```tsx
import { IconCheck } from "@tabler/icons-react"
import { Badge } from "lab-ds"

<Badge variant="secondary">
  <IconCheck data-icon="inline-start" />
  Paid
</Badge>
<Badge variant="destructive">Overdue</Badge>
<Badge variant="outline">Draft</Badge>
```

The stories also show `Default` and `Variants`.
