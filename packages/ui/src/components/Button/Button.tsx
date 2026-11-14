import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"

import styles from "./Button.module.css"

type ButtonVariant =
  "default" | "outline" | "secondary" | "ghost" | "destructive" | "link"

type ButtonSize =
  "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"

type ButtonStyleProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Danger styling; currently defined for the `default` (primary) variant. */
  danger?: boolean
}

/** Class string for styling non-Button elements (e.g. links) as buttons. */
function buttonVariants({
  variant = "default",
  size = "default",
  danger = false,
}: ButtonStyleProps = {}) {
  return cn(
    styles.root,
    styles[variant],
    styles[`size-${size}`],
    danger && styles.danger
  )
}

function Button({
  className,
  variant = "default",
  size = "default",
  danger = false,
  ...props
}: ButtonPrimitive.Props & ButtonStyleProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-danger={danger || undefined}
      className={cn(buttonVariants({ variant, size, danger }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonVariant, ButtonSize, ButtonStyleProps }
