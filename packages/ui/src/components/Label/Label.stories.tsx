import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Input } from "../Input"
import { Label } from "./Label"
import guideline from "./Label.md?raw"

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    // Label.md is the usage guideline; the docs page already shows the "# Label" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { children: "Project name" },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

/** Linked to its input with `htmlFor`; clicking the label focuses the input. */
export const Default: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 8 }}>
      <Label htmlFor="name" {...args} />
      <Input id="name" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText("Project name"))
    await expect(canvas.getByRole("textbox", { name: "Project name" })).toHaveFocus()
  },
}

/** Placed after a disabled control, the label dims too. */
export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 8 }}>
      <Input id="name-disabled" disabled />
      <Label htmlFor="name-disabled" {...args} />
    </div>
  ),
}
