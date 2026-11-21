import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { Button } from "../Button"
import { Input } from "../Input"
import { Label } from "../Label"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog"
import guideline from "./Dialog.md?raw"

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    // Dialog.md is the usage guideline; the docs page already shows the "# Dialog" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

// The dialog renders in a portal on <body>, outside the story canvas.
const page = (canvasElement: HTMLElement) => within(canvasElement.ownerDocument.body)

/** A short form. Checks focus moves in, Escape closes, and focus returns to the trigger. */
export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline" />}>Rename project…</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>The new name shows everywhere the project appears.</DialogDescription>
        </DialogHeader>
        <div style={{ display: "grid", gap: 8 }}>
          <Label htmlFor="project-name">Project name</Label>
          <Input id="project-name" defaultValue="Website redesign" />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Rename project…" })
    await userEvent.click(trigger)

    const dialog = await page(canvasElement).findByRole("dialog", { name: "Rename project" })
    await waitFor(() => expect(dialog).toContainElement(canvasElement.ownerDocument.activeElement as HTMLElement))

    // The × button is named for screen readers but shows no text.
    const close = within(dialog).getByRole("button", { name: "Close" })
    await expect(close.textContent).toBe("")

    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(page(canvasElement).queryByRole("dialog")).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}

function DeleteProjectDialog(props: React.ComponentProps<typeof Dialog>) {
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  return (
    <Dialog disablePointerDismissal {...props}>
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

/**
 * Confirming an irreversible action. Focus starts on Cancel (the safe choice),
 * and a click on the backdrop doesn't close it.
 */
export const DestructiveConfirmation: Story = {
  render: (args) => <DeleteProjectDialog {...args} />,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Delete project…" }))
    const dialog = await page(canvasElement).findByRole("dialog", { name: "Delete project?" })
    const cancel = within(dialog).getByRole("button", { name: "Cancel" })
    await waitFor(() => expect(cancel).toHaveFocus())
  },
}

/** Information only: no × in the corner, a single Close button in the footer. */
export const FooterCloseButton: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="outline" />}>What's new</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>What's new in version 2.4</DialogTitle>
          <DialogDescription>Projects can now be shared with people outside your team.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  ),
}

/** Opened on load, so the dialog is visible without a click (useful for visual review). */
export const Open: Story = {
  args: { defaultOpen: true },
  render: Default.render,
  // Left off the docs page: an open modal there would cover the guideline.
  parameters: { docs: { disable: true } },
}
