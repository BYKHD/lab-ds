import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconCheck } from "@tabler/icons-react"

import { Badge, type BadgeVariant } from "./Badge"
import guideline from "./Badge.md?raw"

const variants: BadgeVariant[] = ["default", "secondary", "destructive", "outline", "ghost", "link"]

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    // Badge.md is the usage guideline; the docs page already shows the "# Badge" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { children: "Badge", variant: "default" },
  argTypes: {
    variant: { control: "inline-radio", options: variants },
    children: { control: "text" },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

const row = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 } as const

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div style={row}>
      {variants.map((variant) => (
        <Badge key={variant} {...args} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
}

/** Statuses next to a list item: a leading icon plus a short word. */
export const WithIcon: Story = {
  render: (args) => (
    <div style={row}>
      <Badge {...args} variant="secondary">
        <IconCheck data-icon="inline-start" />
        Paid
      </Badge>
      <Badge {...args} variant="destructive">Overdue</Badge>
      <Badge {...args} variant="outline">Draft</Badge>
    </div>
  ),
}
