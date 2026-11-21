import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconArrowRight, IconPlus } from "@tabler/icons-react"
import { expect, fn, userEvent, within } from "storybook/test"

import { Button, type ButtonSize, type ButtonVariant } from "./Button"
import guideline from "./Button.md?raw"

const variants: ButtonVariant[] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
]
const textSizes: ButtonSize[] = ["xs", "sm", "default", "lg"]
const iconSizes: ButtonSize[] = ["icon-xs", "icon-sm", "icon", "icon-lg"]

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    // Button.md is the usage guideline; the docs page already shows the "# Button" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    danger: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: { control: "inline-radio", options: variants },
    size: { control: "select", options: [...textSizes, ...iconSizes] },
    danger: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const row = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 } as const
const stack = { display: "grid", gap: 16 } as const

/** Playground: every prop is a control. Also checks that clicks reach `onClick`. */
export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" })
    await expect(button).toHaveAttribute("data-variant", "default")
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Variants: Story = {
  render: (args) => (
    <div style={row}>
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div style={stack}>
      <div style={row}>
        {textSizes.map((size) => (
          <Button key={size} {...args} size={size}>
            {size}
          </Button>
        ))}
      </div>
      <div style={row}>
        {iconSizes.map((size) => (
          <Button key={size} {...args} size={size} aria-label={`Add (${size})`}>
            <IconPlus />
          </Button>
        ))}
      </div>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <div style={row}>
      <Button {...args}>
        <IconPlus data-icon="inline-start" />
        New item
      </Button>
      <Button {...args} variant="outline">
        Continue
        <IconArrowRight data-icon="inline-end" />
      </Button>
    </div>
  ),
}

/** `danger` is styled for the default (primary) variant only. */
export const Danger: Story = {
  args: { danger: true, children: "Delete" },
}

/** Disabled across every variant; clicks must not fire. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div style={row}>
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
      <Button {...args} danger>
        danger
      </Button>
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "default" })
    await expect(button).toBeDisabled()
    await userEvent.click(button, { pointerEventsCheck: 0 })
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

/** `aria-invalid` adds the danger border and ring. */
export const Invalid: Story = {
  args: { variant: "outline", "aria-invalid": true, children: "Invalid" },
}

/** Keyboard focus shows the focus ring. */
export const Focused: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab()
    await expect(within(canvasElement).getByRole("button")).toHaveFocus()
  },
}
