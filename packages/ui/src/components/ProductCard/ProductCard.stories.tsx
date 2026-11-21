import type { Meta, StoryObj } from "@storybook/react-vite"

import { ProductCard } from "./ProductCard"
import guideline from "./ProductCard.md?raw"

// Inline placeholder so stories don't depend on the network.
const image =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#f1e7dc"/><circle cx="200" cy="200" r="110" fill="#e0925a"/></svg>'
  )

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: {
    // ProductCard.md is the usage guideline; the docs page already shows the "# ProductCard" title.
    docs: { description: { component: guideline.replace(/^# .*\n+/, "") } },
  },
  args: {
    image,
    imageAlt: "Orange ceramic mug, front view",
    productName: "Stoneware mug, 350 ml",
    brandName: "Daidai Home",
    price: 390,
  },
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
} satisfies Meta<typeof ProductCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Long names are cut to two lines. */
export const LongName: Story = {
  args: { productName: "Hand-glazed stoneware coffee mug with wide handle, 350 ml, set of two" },
}

export const Small: Story = {
  args: { size: "sm" },
}
