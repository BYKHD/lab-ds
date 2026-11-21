import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "./Separator"
import guideline from "./Separator.md?raw"

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    // Separator.md is the usage guideline; the docs page already shows the "# Separator" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { orientation: "horizontal" },
  argTypes: { orientation: { control: "inline-radio", options: ["horizontal", "vertical"] } },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

/** Splits two sections of a panel. */
export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 320, display: "grid", gap: 12, fontSize: 14 }}>
      <div>Account</div>
      <Separator {...args} />
      <div>Billing</div>
    </div>
  ),
}

/** Between inline items; the parent sets the height. */
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 20, fontSize: 14 }}>
      <span>Docs</span>
      <Separator {...args} />
      <span>Blog</span>
      <Separator {...args} />
      <span>Support</span>
    </div>
  ),
}
