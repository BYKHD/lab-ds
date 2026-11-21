import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "../Label"
import { Textarea } from "./Textarea"
import guideline from "./Textarea.md?raw"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    // Textarea.md is the usage guideline; the docs page already shows the "# Textarea" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { placeholder: "What should reviewers look at first?", disabled: false },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

/** Grows with its content, starting at about three lines. */
export const Default: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 8 }}>
      <Label htmlFor="notes">Notes for reviewers</Label>
      <Textarea id="notes" {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
}

/** `aria-invalid` shows the danger border. */
export const Invalid: Story = {
  args: { "aria-invalid": true },
  render: Default.render,
}
