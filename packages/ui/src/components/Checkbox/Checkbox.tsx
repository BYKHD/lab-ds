"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { IconCheck } from "@tabler/icons-react"
import { cn } from "cn"

import styles from "./Checkbox.module.css"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(styles.root, className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className={styles.indicator}
      >
        <IconCheck />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
