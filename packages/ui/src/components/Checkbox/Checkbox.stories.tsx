import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within } from "storybook/test"

import { Field, FieldContent, FieldDescription, FieldLabel } from "../Field"
import { Checkbox } from "./Checkbox"
import guideline from "./Checkbox.md?raw"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    // Checkbox.md is the usage guideline; the docs page already shows the "# Checkbox" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { disabled: false },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/** With a label. Clicking the label toggles the box. */
export const Default: Story = {
  render: (args) => (
    <Field orientation="horizontal">
      <Checkbox id="terms" {...args} />
      <FieldLabel htmlFor="terms">Accept terms and conditions</FieldLabel>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const box = canvas.getByRole("checkbox", { name: "Accept terms and conditions" })
    await userEvent.click(canvas.getByText("Accept terms and conditions"))
    await expect(box).toHaveAttribute("aria-checked", "true")
  },
}

export const WithDescription: Story = {
  render: (args) => (
    <Field orientation="horizontal">
      <Checkbox id="updates" defaultChecked {...args} />
      <FieldContent>
        <FieldLabel htmlFor="updates">Product updates</FieldLabel>
        <FieldDescription>One email a month about new features.</FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
  play: undefined,
}

/** `aria-invalid` shows the danger border and ring. */
export const Invalid: Story = {
  args: { "aria-invalid": true },
  render: Default.render,
  play: undefined,
}
