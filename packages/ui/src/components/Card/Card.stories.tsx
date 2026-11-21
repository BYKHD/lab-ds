import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../Button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardSize,
} from "./Card"
import guideline from "./Card.md?raw"

const sizes: CardSize[] = ["default", "sm"]

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    // Card.md is the usage guideline; the docs page already shows the "# Card" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { size: "default" },
  argTypes: { size: { control: "inline-radio", options: sizes } },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** Header, content, and a footer with the card's actions. */
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Team plan</CardTitle>
        <CardDescription>Up to 10 members and unlimited projects.</CardDescription>
      </CardHeader>
      <CardContent>Your next invoice is on 1 December.</CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Manage plan</Button>
      </CardFooter>
    </Card>
  ),
}

/** An action in the header's top-right corner. */
export const WithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>3 unread</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">Mark all read</Button>
        </CardAction>
      </CardHeader>
      <CardContent>You were added to "Website redesign".</CardContent>
    </Card>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: Default.render,
}
