import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons-react"
import { expect, within } from "storybook/test"

import { Button } from "../Button"
import { Alert, AlertAction, AlertDescription, AlertTitle, type AlertVariant } from "./Alert"
import guideline from "./Alert.md?raw"

const variants: AlertVariant[] = ["default", "destructive"]

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    // Alert.md is the usage guideline; the docs page already shows the "# Alert" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { variant: "default" },
  argTypes: {
    variant: { control: "inline-radio", options: variants },
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

/** Playground. Also checks the Alert is announced to screen readers. */
export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Your trial ends in 3 days</AlertTitle>
      <AlertDescription>Add a payment method to keep your projects running.</AlertDescription>
    </Alert>
  ),
  play: async ({ canvasElement }) => {
    const alert = within(canvasElement).getByRole("alert")
    await expect(alert).toHaveTextContent("Your trial ends in 3 days")
  },
}

export const Destructive: Story = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args}>
      <IconAlertCircle />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>Your card was declined. Update your billing details and try again.</AlertDescription>
    </Alert>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <IconInfoCircle />
      <AlertTitle>New sign-in from Chrome on macOS</AlertTitle>
      <AlertDescription>If this wasn't you, change your password.</AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: (args) => (
    <Alert {...args}>
      <IconInfoCircle />
      <AlertTitle>A new version is available</AlertTitle>
      <AlertDescription>Reload to get the latest changes.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">Reload</Button>
      </AlertAction>
    </Alert>
  ),
}

/** Title only, no description. */
export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Changes saved locally. You're offline.</AlertTitle>
    </Alert>
  ),
}
