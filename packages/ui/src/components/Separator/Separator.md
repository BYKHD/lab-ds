# Separator

A thin line that divides content into groups.

## When to use

- To split sections of a panel, menu, or card when spacing alone doesn't make the grouping clear.
- Vertically, between inline items such as links in a footer.

## When not to use

- When spacing already separates the groups. Extra lines add visual noise.
- To separate form groups with a label in the middle ("Or continue with"). Use `FieldSeparator`.
- As a page or card border. Use `Card`.
- As a resizable splitter between panes. Separator can't be dragged.

## Props and variants

| Prop | Values | Default | What it does |
| --- | --- | --- | --- |
| `orientation` | `horizontal`, `vertical` | `horizontal` | `horizontal` spans the full width. `vertical` takes the full height of its parent, so the parent must have a height. |

The line is 1px. There are no other variants.

Screen readers announce it as a separator. TODO: confirm whether purely decorative lines should be hidden from screen readers.

## Tokens used

| Token | Where |
| --- | --- |
| `--color-on-base-border-default` | Line color |

The token has a dark-mode value and switches automatically.

## Example

From the `Vertical` story:

```tsx
import { Separator } from "@bykhd/lab-ds"

<div style={{ display: "flex", alignItems: "center", gap: 12, height: 20 }}>
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Support</span>
</div>
```

The stories also show `Default` (horizontal).
