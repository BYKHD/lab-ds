import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "../Card"
import type { CardSize } from "../Card"

import styles from "./ProductCard.module.css"

type ProductCardProps = Omit<React.ComponentProps<"div">, "children"> & {
  image: string
  imageAlt?: string
  productName: string
  brandName: string
  price: number
  size?: CardSize
}

const priceFormat = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
})

function ProductCard({
  image,
  imageAlt,
  productName,
  brandName,
  price,
  className,
  ...props
}: ProductCardProps) {
  return (
    <Card data-slot="product-card" className={className} {...props}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Card styles img:first-child */}
      <img src={image} alt={imageAlt ?? productName} className={styles.image} />
      <CardHeader>
        <span className={styles.brand}>{brandName}</span>
        <CardTitle className={styles.name}>{productName}</CardTitle>
      </CardHeader>
      <CardContent className={styles.price}>{priceFormat.format(price)}</CardContent>
    </Card>
  )
}

export { ProductCard }
export type { ProductCardProps }
