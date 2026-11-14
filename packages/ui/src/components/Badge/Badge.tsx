"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

import styles from "./Badge.module.css"

type BadgeVariant =
  "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"

type BadgeStyleProps = { variant?: BadgeVariant }

/** Class string for styling non-Badge elements as badges. */
function badgeVariants({ variant = "default" }: BadgeStyleProps = {}) {
  return cn(styles.root, styles[variant])
}

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & BadgeStyleProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
export type { BadgeVariant, BadgeStyleProps }
