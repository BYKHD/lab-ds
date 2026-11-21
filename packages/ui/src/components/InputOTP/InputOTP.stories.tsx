import type { Meta, StoryObj } from "@storybook/react-vite"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./InputOTP"
import guideline from "./InputOTP.md?raw"

const meta = {
  title: "Components/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    // InputOTP.md is the usage guideline; the docs page already shows the "# InputOTP" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: { maxLength: 6, disabled: false, render: undefined, children: null },
} satisfies Meta<typeof InputOTP>

export default meta
type Story = StoryObj<typeof meta>

/** A 6-digit code in two groups of three. */
export const Default: Story = {
  render: (args) => (
    <InputOTP disabled={args.disabled} maxLength={6} pattern={REGEXP_ONLY_DIGITS} aria-label="Verification code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}

/** A 4-digit code in one group. */
export const FourDigits: Story = {
  render: (args) => (
    <InputOTP disabled={args.disabled} maxLength={4} pattern={REGEXP_ONLY_DIGITS} aria-label="PIN">
      <InputOTPGroup>
        {[0, 1, 2, 3].map((i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render,
}
