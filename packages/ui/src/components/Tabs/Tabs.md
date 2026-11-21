# Tabs

Splits related content into a few views on the same page and shows one view at a time.

## When to use

- To group related content into 2–5 sections that people look at one at a time, such as Overview, Activity, and Settings for one project.
- When people can stay where they are and don't need every section at once.
- When the sections are about the same thing and the first section is the one most people need.

## When not to use

- To go to another page. Use links (navigation), even if they look like tabs.
- For steps that must be done in order. TODO: lab-ds has no stepper or progress indicator yet.
- When people need to compare content across sections. Put it on one page instead.
- When people may need several sections open at once. TODO: lab-ds has no accordion yet.
- To switch between formats or filters of the same content (e.g. List / Grid). TODO: lab-ds has no segmented control or toggle group yet.
- When the page reads fine without them. Tabs hide content, and not everyone notices them.
- To hide a form field that's required or might show an error. People won't see it.
- Inside another set of Tabs.

## Rules

- **Labels:** one or two words, sentence case, saying clearly what's in the tab. Labels don't wrap, so keep them short.
- **Order:** most needed first. Keep the order the same every time; don't reorder tabs based on use.
- **Count:** at least 2. Keep to about 4 so they fit on one row; if they don't fit, there are probably too many.
- **Always set which tab starts selected** (`defaultValue` or `value`), matching a tab that exists. Otherwise no tab is selected.
- **Disabled tabs:** prefer removing a tab that has nothing to show. If a tab is unavailable for a reason (e.g. permissions), disable it and explain why nearby. Design systems disagree here.
- **Icons:** optional, before the label. Don't use icon-only tabs.

## Parts

| Part | What it is |
| --- | --- |
| `Tabs` | Holds the selected tab and lays out the list and panels. |
| `TabsList` | The row (or column) of tabs. |
| `TabsTrigger` | One tab. Medium-weight small text. The selected tab is darker. |
| `TabsContent` | The panel shown for one tab. Only the selected panel is shown. |

## Props and variants

| Part | Prop | Values | Default | What it does |
| --- | --- | --- | --- | --- |
| `TabsList` | `variant` | `default`, `line` | `default` | `default`: tabs sit in a tinted, rounded track and the selected tab is a raised white pill. `line`: no track; the selected tab gets an underline (or a side line when vertical). |
| `Tabs` | `orientation` | `horizontal`, `vertical` | `horizontal` | `horizontal`: tabs in a row above the panel. `vertical`: tabs stacked to the left of the panel. |
| `Tabs` | `defaultValue` | the `value` of a tab | `0` | Which tab is selected first. Always set it. |
| `Tabs` | `value` / `onValueChange` | tab value / function | not set | Control the selected tab yourself, e.g. to keep it in the URL. |
| `TabsTrigger`, `TabsContent` | `value` | any | required | Links a tab to its panel. Use the same value on both. |
| `TabsTrigger` | `disabled` | `true`, `false` | `false` | Shown at half opacity; can't be selected. |
| `TabsList` | `activateOnFocus` | `true`, `false` | `false` | `false`: arrow keys move focus, Enter or Space selects. `true`: moving focus selects the tab. Use `true` only when panels show instantly. |
| `TabsList` | `loopFocus` | `true`, `false` | `true` | Arrow keys wrap from the last tab to the first. |
| `TabsContent` | `keepMounted` | `true`, `false` | `false` | Keeps hidden panels in the page, e.g. to keep a half-filled form. |

There is one size: the horizontal tab row is 32px tall.

## Behaviour and accessibility

Built in:

- Tab moves focus to the selected tab; the next Tab moves into the panel.
- Left and Right arrows move between tabs (Up and Down when vertical). Disabled tabs are skipped.
- Screen readers announce the tabs, which one is selected, and the panel each controls.

Your job:

- Give each panel a heading or first line that matches its tab label, so people know where they landed.
- TODO: if a panel has no focusable content, keyboard users can't reach it with Tab. Confirm whether panels should take focus.

## Tokens used

| Token | Where |
| --- | --- |
| `--color-base-foreground-inset` | Track behind the tabs (`default`) |
| `--color-base-foreground-card` | Selected tab background (`default`) |
| `--color-on-base-content-medium` | Unselected tab text |
| `--color-on-base-content-high` | Selected and hovered tab text; underline (`line`) |
| `--color-primary-border-strong` | Focus border and ring |
| `--radius-lg` (0.75rem) | Track corners |
| `--radius-md` (0.5rem) | Tab corners |

All color tokens have dark-mode values and switch automatically.

TODO: the selected tab's shadow is Tailwind's stock small shadow, not a lab-ds token.

TODO: shadcn's original gives the selected tab a border and a tinted fill in dark mode; lab-ds uses the same tokens in both modes. Check the dark-mode look against Figma.

## Example

From the `Default` story:

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "lab-ds"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">12 pages, last edited today.</TabsContent>
  <TabsContent value="activity">Mina renamed the project.</TabsContent>
  <TabsContent value="settings">Project name, visibility, and members.</TabsContent>
</Tabs>
```

The stories also show `Line`, `Vertical`, and `DisabledTab`.

## References

[WAI-ARIA APG tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), [Base UI Tabs](https://base-ui.com/react/components/tabs), [Carbon tabs](https://carbondesignsystem.com/components/tabs/usage/), [GOV.UK tabs](https://design-system.service.gov.uk/components/tabs/).

TODO: these are common practice but weren't checked against a primary source: sentence-case labels, no nested tabs, not hiding required fields in tabs, and not reordering tabs.
