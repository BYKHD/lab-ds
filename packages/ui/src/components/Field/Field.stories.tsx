import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "../Checkbox"
import { Input } from "../Input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  type FieldOrientation,
} from "./Field"
import guideline from "./Field.md?raw"

const orientations: FieldOrientation[] = ["vertical", "horizontal", "responsive"]

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    // Field.md is the usage guideline; the docs page already shows the "# Field" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { orientation: "vertical" },
  argTypes: { orientation: { control: "inline-radio", options: orientations } },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

/** Label, control, and help text. */
export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="you@example.com" aria-describedby="email-help" />
      <FieldDescription id="email-help">We'll send the receipt here.</FieldDescription>
    </Field>
  ),
}

/** The error replaces the help text and the control is marked `aria-invalid`. */
export const WithError: Story = {
  render: (args) => (
    <Field {...args} data-invalid="true">
      <FieldLabel htmlFor="email-err">Email</FieldLabel>
      <Input id="email-err" type="email" defaultValue="you@" aria-invalid aria-describedby="email-err-msg" />
      <FieldError id="email-err-msg">Enter an email address like name@example.com.</FieldError>
    </Field>
  ),
}

/** Related checkboxes grouped under one legend. */
export const FieldSetWithLegend: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="n-email" defaultChecked />
          <FieldLabel htmlFor="n-email">Email</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="n-sms" />
          <FieldLabel htmlFor="n-sms">Text message</FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
