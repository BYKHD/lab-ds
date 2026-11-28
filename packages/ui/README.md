# @bykhd/lab-ds

Daidai design system: React components built on [Base UI](https://base-ui.com) and styled with Tailwind CSS v4. Made for Next.js apps, works in any React 19 app.

## Install

```bash
npm install @bykhd/lab-ds
```

`react` and `react-dom` 19 are peer dependencies.

## Stylesheet setup

The package ships one stylesheet, `@bykhd/lab-ds/styles.css`: the design tokens (CSS variables, Tailwind `@theme`, dark mode) plus the precompiled component styles. Import it after Tailwind in your global CSS:

```css
/* app/globals.css */
@import "tailwindcss";
@import "@bykhd/lab-ds/styles.css";
```

No `@source` line is needed: component styles are already compiled. Your app's Tailwind can use the tokens as utilities (`bg-…`, `text-…`, `border-…`).

Provide the font through `--font-sans`, for example with `next/font`:

```tsx
// app/layout.tsx
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

Dark mode: add the `dark` class to `<html>`.

## Example

```tsx
import { Button, Field, FieldLabel, Input } from "@bykhd/lab-ds"

export function SignUp() {
  return (
    <form>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" />
      </Field>
      <Button type="submit">Sign up</Button>
    </form>
  )
}
```

The entry is marked `"use client"`, so you can import components straight into a Server Component file in the Next.js App Router.

## Components

Each component has a usage guideline shipped in the package at `node_modules/@bykhd/lab-ds/src/components/<Name>/<Name>.md`.

| Component | Exports |
| --- | --- |
| Alert | `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction` |
| Badge | `Badge`, `badgeVariants` |
| Button | `Button`, `buttonVariants` |
| Card | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` |
| Checkbox | `Checkbox` |
| Dialog | `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` |
| Field | `Field`, `FieldSet`, `FieldLegend`, `FieldGroup`, `FieldContent`, `FieldLabel`, `FieldTitle`, `FieldDescription`, `FieldSeparator`, `FieldError` |
| Input | `Input` |
| InputGroup | `InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupText`, `InputGroupInput`, `InputGroupTextarea` |
| InputOTP | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` |
| Label | `Label` |
| ProductCard | `ProductCard` |
| Separator | `Separator` |
| Tabs | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| Textarea | `Textarea` |

## License

MIT
