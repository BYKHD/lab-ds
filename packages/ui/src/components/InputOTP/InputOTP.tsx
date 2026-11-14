"use client"

import * as React from "react"
import { IconMinus } from "@tabler/icons-react"
import { cn } from "cn"
import { OTPInput, OTPInputContext } from "input-otp"

import styles from "./InputOTP.module.css"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(styles.container, containerClassName)}
      spellCheck={false}
      className={cn(styles.input, className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(styles.slot, className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className={styles.caret}>
          <div className={styles["caret-line"]} />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className={cn(styles.separator, className)}
      {...props}
    >
      <IconMinus />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
