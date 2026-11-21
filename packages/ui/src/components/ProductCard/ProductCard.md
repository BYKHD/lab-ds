# ProductCard

Shows one product in a shop listing: photo, brand, name, and price.

## When to use

- In a grid or row of products that people browse and compare.
- When the product has a photo, a brand, a name, and a single price.

## When not to use

- For anything that isn't a product for sale. Use `Card`.
- For a product detail page. ProductCard is a summary.
- When you need extra content (ratings, sale price, "Add to cart"). ProductCard takes no other content. TODO: confirm whether these are planned.
- TODO: the card isn't a link and has no hover state. Confirm how a ProductCard should open the product page.

## Content

- **Photo:** square, cropped to fill. Write `imageAlt` to describe the product ("Orange ceramic mug, front view"); if you leave it out, the product name is used.
- **Brand:** small, muted text above the name.
- **Name:** cut off after two lines. Put the important words first.
- **Price:** a number in Thai baht. It's formatted for you (e.g. ฿390.00). TODO: currency and locale are fixed to THB / Thai; confirm whether other currencies are needed.

## Props and variants

| Prop | Values | Default | What it does |
| --- | --- | --- | --- |
| `image` | URL | required | Product photo. |
| `imageAlt` | text | the product name | Describes the photo for screen readers. |
| `productName` | text | required | Product name. |
| `brandName` | text | required | Brand name. |
| `price` | number | required | Price in THB. |
| `size` | `default`, `sm` | `default` | Same as `Card`: `sm` uses tighter spacing. |

## Tokens used

| Token | Where |
| --- | --- |
| `--color-base-foreground-inset` | Photo area while the image loads |
| `--color-on-base-content-medium` | Brand |
| `--color-on-base-content-high` | Price |

Background, border, corners, and name styling come from `Card`. All color tokens have dark-mode values and switch automatically.

## Example

From the `Default` story (the story uses an inline placeholder image instead of a URL):

```tsx
import { ProductCard } from "lab-ds"

<ProductCard
  image="/images/mug.jpg"
  imageAlt="Orange ceramic mug, front view"
  productName="Stoneware mug, 350 ml"
  brandName="Daidai Home"
  price={390}
/>
```

The stories also show `LongName` and `Small`.
