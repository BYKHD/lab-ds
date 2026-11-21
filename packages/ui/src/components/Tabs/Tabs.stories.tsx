import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconCreditCard, IconUser } from "@tabler/icons-react"
import { expect, userEvent, within } from "storybook/test"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import guideline from "./Tabs.md?raw"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    // Tabs.md is the usage guideline; the docs page already shows the "# Tabs" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { defaultValue: "overview", orientation: "horizontal" },
  argTypes: { orientation: { control: "inline-radio", options: ["horizontal", "vertical"] } },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

/** Three views of one project. Checks arrow keys move focus, and Enter shows that tab's panel. */
export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">12 pages, last edited today.</TabsContent>
      <TabsContent value="activity">Mina renamed the project.</TabsContent>
      <TabsContent value="settings">Project name, visibility, and members.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const overview = canvas.getByRole("tab", { name: "Overview" })
    await expect(overview).toHaveAttribute("aria-selected", "true")
    await userEvent.click(overview)
    await userEvent.keyboard("{ArrowRight}")
    const activity = canvas.getByRole("tab", { name: "Activity" })
    await expect(activity).toHaveFocus()
    await expect(activity).toHaveAttribute("aria-selected", "false")
    await userEvent.keyboard("{Enter}")
    await expect(activity).toHaveAttribute("aria-selected", "true")
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("Mina renamed the project.")
  },
}

/** Underline style, for tabs at the top of a page section. */
export const Line: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">12 pages, last edited today.</TabsContent>
      <TabsContent value="activity">Mina renamed the project.</TabsContent>
      <TabsContent value="settings">Project name, visibility, and members.</TabsContent>
    </Tabs>
  ),
}

/** Tabs stacked on the left. */
export const Vertical: Story = {
  args: { orientation: "vertical", defaultValue: "account" },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">
          <IconUser data-icon="inline-start" />
          Account
        </TabsTrigger>
        <TabsTrigger value="billing">
          <IconCreditCard data-icon="inline-start" />
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Name, email, and password.</TabsContent>
      <TabsContent value="billing">Plan, payment method, and invoices.</TabsContent>
    </Tabs>
  ),
}

/** A disabled tab is skipped by the arrow keys. */
export const DisabledTab: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity" disabled>Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">12 pages, last edited today.</TabsContent>
      <TabsContent value="activity">Mina renamed the project.</TabsContent>
      <TabsContent value="settings">Project name, visibility, and members.</TabsContent>
    </Tabs>
  ),
}
