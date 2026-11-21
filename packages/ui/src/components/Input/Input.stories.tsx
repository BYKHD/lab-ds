import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "../Label"
import { Input } from "./Input"
import guideline from "./Input.md?raw"

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    // Input.md is the usage guideline; the docs page already shows the "# Input" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { placeholder: "Website redesign", disabled: false },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

const stack = { display: "grid", gap: 8 } as const

/** Always paired with a visible label. */
export const Default: Story = {
  render: (args) => (
    <div style={stack}>
      <Label htmlFor="project">Project name</Label>
      <Input id="project" {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Website redesign" },
  render: Default.render,
}

/** `aria-invalid` shows the danger border. */
export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "a" },
  render: Default.render,
}

export const File: Story = {
  args: { type: "file", placeholder: undefined },
  render: Default.render,
}
