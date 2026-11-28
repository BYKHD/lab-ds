# Card

A bordered container that groups content and actions about one subject.

## When to use

- To group information about one thing, such as a plan, a project, or a setting, so it reads as a unit.
- To lay out several similar items in a grid that people scan and compare.
- When the group has its own title and, optionally, its own actions.

## When not to use

- Just to add a border or padding around content. Use layout spacing instead.
- For a message the user must notice. Use `Alert`.
- For a task that needs the user's full attention. Use `Dialog`.
- For a product in a shop listing. Use `ProductCard`.
- Inside another Card. Nested borders make the hierarchy hard to read.
- TODO: confirm whether a whole Card can be clickable (a link). There is no clickable style.

## Parts

| Part | What it is |
| --- | --- |
| `Card` | The container: card-colored background, thin border, large rounded corners. |
| `CardHeader` | Top area for the title, description, and action. |
| `CardTitle` | The card's heading. Medium weight. |
| `CardDescription` | One line of supporting text under the title, in a muted color. |
| `CardAction` | A spot in the header's top-right corner for a small `Button`. |
| `CardContent` | The main body. |
| `CardFooter` | A tinted strip along the bottom with a top border, for actions. |

An image placed as the first item of a Card runs edge to edge with rounded top corners.

TODO: `CardTitle` is not a heading element. Confirm how card titles should fit into the page's heading structure.

## Props and variants

| Prop | Values | Default |
| --- | --- | --- |
| `size` | `default`, `sm` | `default` |

| `size` | Spacing | Title text |
| --- | --- | --- |
| `default` | 16px inside and between parts | Base size |
| `sm` | 12px inside and between parts | Small size |

There are no visual variants.

## Tokens used

| Token | Where |
| --- | --- |
| `--color-base-foreground-card` | Card background |
| `--color-on-base-content-high` | Text and title |
| `--color-on-base-content-medium` | Description |
| `--color-on-base-border-default` | Card border and footer top border |
| `--color-base-foreground-surface-subtle` | Footer background |
| `--radius-xl` (1rem) | Corners |
| `--font-heading` | Title font |

All color tokens have dark-mode values and switch automatically.

## Example

From the `Default` story:

```tsx
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@bykhd/lab-ds"

<Card>
  <CardHeader>
    <CardTitle>Team plan</CardTitle>
    <CardDescription>Up to 10 members and unlimited projects.</CardDescription>
  </CardHeader>
  <CardContent>Your next invoice is on 1 December.</CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">Manage plan</Button>
  </CardFooter>
</Card>
```

The stories also show `WithAction` and `Small`.
