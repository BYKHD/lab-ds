# Alert

Shows a short, important message inline on the page, such as a status, a warning, or an error.

## When to use

- To tell the user something about the current page or section that they should notice right away: a failed save, a problem with their account, a requirement before they can continue.
- To show an error that affects a whole form or section rather than one field.
- When the message should stay visible until the situation changes, not disappear on its own.

## When not to use

- For an error on a single input. Show it next to that field instead (see `Field`).
- For a message that needs a decision before the user can go on. Use `Dialog`.
- For a short label or status on an item, like "New" or "Paid". Use `Badge`.
- For routine information that isn't urgent. Alert is announced to screen readers as soon as it appears, so too many of them become noise.
- TODO: confirm whether lab-ds will have a toast for brief, temporary confirmations ("Saved"). There isn't one yet.

## Parts

An Alert is built from these parts. Only the container is required.

| Part | What it is |
| --- | --- |
| `Alert` | The container. Holds everything else. |
| `AlertTitle` | One short line saying what happened. Medium weight. |
| `AlertDescription` | Supporting text: detail, cause, or what to do next. Can hold more than one paragraph. Links inside it are underlined. |
| `AlertAction` | A spot in the top-right corner for an action, such as a `Button`. The text moves over to make room for it. |
| Icon (optional) | Place an icon as the first item inside `Alert`. It sits in its own column on the left, at 16px, in the same color as the text. |

## Props and variants

`Alert` has one prop of its own:

| Prop | Values | Default |
| --- | --- | --- |
| `variant` | `default`, `destructive` | `default` |

| `variant` | Look | Use for |
| --- | --- | --- |
| `default` | Card-colored background, regular text | Neutral or informational messages |
| `destructive` | Light red background, red border, red text | Errors and anything that went wrong or can cause loss |

There are no `success`, `warning`, or `info` variants, and no sizes. TODO: decide whether warning/success variants are needed; tokens for them would come from `theme.css`.

Every part also accepts the normal props of a `<div>`, such as `id` and `className`.

## Tokens used

| Token | Where |
| --- | --- |
| `--color-base-foreground-card` | `default` background |
| `--color-on-base-content-high` | `default` text and title; link hover color |
| `--color-on-base-content-medium` | Description text in the `default` variant |
| `--color-danger-foreground-subtle` | `destructive` background |
| `--color-danger-border-default` | `destructive` border |
| `--color-danger-content-default` | `destructive` text, title, and description |
| `--radius-lg` (0.75rem) | Corner radius |

All color tokens have dark-mode values in `theme.css` and switch automatically.

The `default` variant's border is the global default border color, `--color-on-base-border-default`.

## Example

From the `WithAction` story: an icon, a title, a description, and a small outline `Button` in the action spot.

```tsx
import { IconInfoCircle } from "@tabler/icons-react"
import { Alert, AlertAction, AlertDescription, AlertTitle, Button } from "lab-ds"

<Alert>
  <IconInfoCircle />
  <AlertTitle>A new version is available</AlertTitle>
  <AlertDescription>Reload to get the latest changes.</AlertDescription>
  <AlertAction>
    <Button size="sm" variant="outline">Reload</Button>
  </AlertAction>
</Alert>
```

The stories also show `Default`, `Destructive`, `WithIcon`, and `TitleOnly`.
