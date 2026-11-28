# Dialog

A modal window over the page that asks the user to complete one focused task or make a decision before they go back to the page.

## When to use

- To confirm an action that is destructive or hard to undo ("Delete project?").
- For a short, self-contained task that shouldn't take the user away from where they are: rename an item, invite a member, a 2–3 field form.
- When the user must deal with something before they can continue, and the page behind should be blocked while they do.
- When the user opened it themselves (by pressing a Button), not as a surprise.

## When not to use

- For status messages, warnings, or errors that don't need a decision. Use `Alert` inline on the page.
- For brief confirmations like "Saved". TODO: lab-ds has no toast yet.
- For long or multi-step content, large forms, or anything the user may want to bookmark or share. Use a full page.
- For content the user needs to see alongside the page (filters, details panel). TODO: lab-ds has no sheet/drawer or popover yet.
- For small hints or extra info next to a control. TODO: lab-ds has no tooltip or popover yet.
- To open on page load, for marketing or promotions. Unrequested dialogs interrupt the user.
- Inside another dialog. Avoid dialogs that open dialogs. The one accepted exception is a confirmation to discard unsaved changes.
- TODO: lab-ds has no alert dialog. That is a separate pattern for confirmations the user must answer, and screen readers announce it as an alert. Until lab-ds has one, use the `DestructiveConfirmation` recipe below: `disablePointerDismissal` plus initial focus on Cancel. It works the same way, but screen readers still announce it as an ordinary dialog.

## Parts

A Dialog is built from these parts. `Dialog`, `DialogContent`, and `DialogTitle` are always needed.

| Part | What it is |
| --- | --- |
| `Dialog` | Holds the open/closed state. Renders nothing itself. |
| `DialogTrigger` | The control that opens the dialog, usually a `Button`. |
| `DialogContent` | The dialog window: a centered card above a dimmed, slightly blurred backdrop. Shows a close (×) button in the top-right corner by default. |
| `DialogHeader` | Stacks the title and description. |
| `DialogTitle` | Required. One short line saying what the dialog is for. Screen readers announce it as the dialog's name. |
| `DialogDescription` | Supporting text below the title. Add it to confirmations and short messages. A form can go without it. Muted color; links inside it are underlined. Read out by screen readers with the title. |
| `DialogFooter` | The action bar at the bottom: a tinted strip with a top border. Buttons sit right-aligned in a row; on small screens they stack full width with the last Button on top. |
| `DialogClose` | Wraps any control that should close the dialog, such as a "Cancel" `Button`. |

## Props and variants

Dialog has **no visual variants and no sizes**. Width is fixed: 384px (24rem) on screens 640px and wider, otherwise the screen width minus 16px on each side. That width suits a confirmation or a form of 2–3 fields; bigger content belongs on a page. TODO: decide whether wider sizes are needed (Carbon, for example, has four).

Props added by lab-ds:

| Part | Prop | Values | Default | What it does |
| --- | --- | --- | --- | --- |
| `DialogContent` | `showCloseButton` | `true`, `false` | `true` | Shows the × close button in the top-right corner. |
| `DialogFooter` | `showCloseButton` | `true`, `false` | `false` | Adds an outline "Close" Button at the end of the footer. |

Behaviour props on `Dialog` (from Base UI):

| Prop | Values | Default | What it does |
| --- | --- | --- | --- |
| `open` / `onOpenChange` | boolean / function | not set | Control the open state yourself, e.g. to close after a save succeeds. |
| `defaultOpen` | `true`, `false` | `false` | Open on first render without controlling it. |
| `modal` | `true`, `false`, `'trap-focus'` | `true` | `true`: focus stays in the dialog, the page can't scroll or be clicked. `'trap-focus'`: focus is kept in, but the page can still scroll and be clicked. `false`: no restrictions. Keep `true` unless there's a clear reason. With `false` or `'trap-focus'` the page stays usable, so it is no longer a true modal. |
| `disablePointerDismissal` | `true`, `false` | `false` | Stops a click on the backdrop from closing the dialog. Use it when closing by accident would lose input or skip a required decision. Escape still closes. |

`DialogContent` also accepts Base UI's `initialFocus` and `finalFocus`, to choose which element gets focus when the dialog opens and closes. The defaults are usually right; see Accessibility.

## Behaviour and accessibility

These come built in. Don't remove them.

- Focus moves into the dialog when it opens and stays inside it while it's open (with the default `modal`).
- When it closes, focus goes back to the control that opened it. If that control is gone (for example, the row was deleted), use `finalFocus` to choose where focus goes.
- When opened by touch, focus goes to the dialog itself, not its first field, so the on-screen keyboard doesn't pop up.
- Escape closes it. Clicking the backdrop closes it unless `disablePointerDismissal` is set.
- The page behind can't be scrolled or clicked while it's open.
- Opens and closes with a short fade and scale.

Your job:

- Always include a `DialogTitle`, even if it's short. Without it the dialog has no name for screen readers.
- Keep a visible way to close inside the dialog: the × button, a "Cancel" Button, or both. People using a screen reader on a touch screen can't press Escape. Don't hide the × (`showCloseButton={false}`) unless the footer has a Cancel or Close Button.
- In a destructive confirmation, initial focus always goes to the safer action (e.g. "Cancel"), set with `initialFocus`. The WAI-ARIA guide only suggests this; lab-ds makes it a rule.
- If the dialog opens with long text before any control, move initial focus to the title so screen-reader users start at the top. The title can't take focus by default, so add `tabIndex={-1}` to it and pass its ref to `initialFocus`.
- Use `disablePointerDismissal` for dialogs with a form or a required decision, so a stray click on the backdrop can't throw away input. Leave it off for dialogs that only show information.

## Content

- **Title:** always visible. Says what is being decided or done, in sentence case. Prefer a specific question or action, ideally reusing the trigger's label: "Invite member…" opens "Invite a member". Avoid "Are you sure?" and "Warning".
- **Description:** add it when the title alone doesn't say what's at stake. One or two sentences, including consequences ("This deletes all 12 pages. You can't undo this.").
- **Actions:** one primary Button, plus Cancel. Labels are verbs that repeat the action: "Delete project", not "OK" or "Yes". "OK" is acceptable only for a dialog that just asks the user to acknowledge something. Follow the `Button` guideline:
  - Primary is last (right side). Cancel uses `variant="outline"`.
  - For a confirm that destroys data, use `<Button danger>` as the primary.
  - Use `default` size Buttons in the footer.
- **Length:** keep it short enough to read without scrolling. If it needs to scroll, it probably belongs on a page. Never scroll sideways. TODO: lab-ds doesn't handle tall content yet. The dialog has no maximum height and no scrolling area, so keep dialogs short. Other systems (e.g. Carbon) scroll only the body and keep the title and footer fixed.

## Tokens used

| Token | Where |
| --- | --- |
| `--color-base-foreground-blanket` | Backdrop behind the dialog (black at 50%) |
| `--color-base-foreground-card` | Dialog background |
| `--color-on-base-content-high` | Body text and title |
| `--color-on-base-content-medium` | Description text |
| `--color-base-foreground-surface-subtle` | Footer background |
| `--color-on-base-border-default` | Footer top border (the global default border color) |
| `--radius-xl` (1rem) | Dialog corner radius; also the footer's bottom corners |
| `--font-heading` | Title font (currently the same as `--font-sans`) |

All color tokens have dark-mode values in `theme.css` and switch automatically. The backdrop is black at 50% in both modes.

The close button and footer Buttons use the `Button` tokens (`ghost` and `outline` variants).

TODO: the dialog's shadow is Tailwind's stock `shadow-lg`, not a lab-ds token. The only elevation token is `--shadow-comp-cta`. Decide whether to add a modal elevation token.

## Example

From the `DestructiveConfirmation` story: a `variant="destructive"` Button opens the dialog. Focus starts on Cancel, a click on the backdrop doesn't close the dialog, and a `danger` Button confirms.

```tsx
import * as React from "react"
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bykhd/lab-ds"

function DeleteProjectDialog() {
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  return (
    <Dialog disablePointerDismissal>
      <DialogTrigger render={<Button variant="destructive" />}>Delete project…</DialogTrigger>
      <DialogContent initialFocus={cancelRef}>
        <DialogHeader>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription>
            This deletes "Website redesign" and all 12 pages. You can't undo this.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose ref={cancelRef} render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button danger>Delete project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

The stories also show `Default` (a short rename form), `FooterCloseButton` (information only, with a single Close button), and `Open`. `Open` starts open only so reviewers can see the dialog in Storybook; don't open dialogs on page load in a product.

## References

Guidance above follows the [WAI-ARIA APG modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) and [alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) patterns, [Base UI Dialog](https://base-ui.com/react/components/dialog), [IBM Carbon modal](https://carbondesignsystem.com/components/modal/usage/), and [Atlassian modal dialog](https://atlassian.design/components/modal-dialog/usage). For initial focus in destructive dialogs, APG suggests the least destructive action and Atlassian focuses the close button; lab-ds follows APG and makes it a rule.

TODO: these points are common practice but weren't checked against a primary source: stacking footer Buttons on small screens with the primary on top, avoiding "Are you sure?" titles, and only opening a dialog when the user asks for it.
