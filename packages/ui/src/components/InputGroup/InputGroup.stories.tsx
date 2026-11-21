import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconCopy, IconSearch } from "@tabler/icons-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./InputGroup"
import guideline from "./InputGroup.md?raw"

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    // InputGroup.md is the usage guideline; the docs page already shows the "# InputGroup" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

/** A search field with a leading icon. */
export const Default: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput type="search" placeholder="Search projects" aria-label="Search projects" />
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
    </InputGroup>
  ),
}

/** Fixed text before and after the value. */
export const WithText: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput placeholder="my-site" aria-label="Subdomain" />
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>.example.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
}

/** An icon button at the end. Icon-only buttons need an `aria-label`. */
export const WithButton: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupInput readOnly defaultValue="https://example.com/invite/8f2k" aria-label="Invite link" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Copy link">
          <IconCopy />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

/** A textarea with a toolbar below it. */
export const WithTextarea: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupTextarea placeholder="Write a comment" aria-label="Comment" />
      <InputGroupAddon align="block-end">
        <InputGroupButton variant="default" size="sm" className="ml-auto">Post</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
