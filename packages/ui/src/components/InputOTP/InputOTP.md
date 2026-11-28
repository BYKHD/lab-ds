# InputOTP

A row of boxes for entering a short one-time code, such as a 6-digit verification code.

## When to use

- For a verification or sign-in code sent by SMS, email, or an authenticator app.
- For a short PIN of fixed length.

## When not to use

- For passwords or any value of unknown length. Use `Input` with `type="password"`.
- For long codes like license keys or recovery codes. Use `Input`.

## Rules

- Show one box per character. The number of boxes must match the code length.
- Give it a label that says where the code came from ("Enter the code we sent to 08x-xxx-1234").
- Keep the browser's one-time-code autofill working. Don't turn autocomplete off.
- People can paste the whole code; it fills every box. It's one field, so Tab moves past it in one step.
- Tell people how to get a new code if theirs expired.
- Group 6-digit codes as 3 + 3 with a separator; keep 4-digit codes in one group.

## Parts

| Part | What it is |
| --- | --- |
| `InputOTP` | The field. Holds the groups. |
| `InputOTPGroup` | A set of joined boxes. |
| `InputOTPSlot` | One box, showing one character. The active box gets a focus ring and a blinking caret. |
| `InputOTPSeparator` | A dash between groups. |

## Props and variants

There are no visual variants and one size (32px boxes).

| Prop | Values | Default | What it does |
| --- | --- | --- | --- |
| `maxLength` | number | required | Code length. Must match the number of slots. |
| `pattern` | pattern | any character | Which characters are allowed, e.g. digits only. |
| `value` / `onChange` | string / function | not set | Control the code yourself. |
| `onComplete` | function | not set | Runs when every box is filled, e.g. to submit. |
| `disabled` | `true`, `false` | `false` | Shown at half opacity and can't be changed. |
| `index` (on `InputOTPSlot`) | number | required | Which character this box shows, from 0. |

`aria-invalid` on a slot shows a red border. TODO: confirm how an invalid code should be shown (slot borders vs a `FieldError` below).

## Tokens used

| Token | Where |
| --- | --- |
| `--color-base-foreground-action` | Box background |
| `--color-on-base-border-default` | Box borders |
| `--color-on-base-content-high` | Characters and caret |
| `--color-primary-border-strong` | Active box border and ring |
| `--color-danger-border-strong` | Invalid border and ring |
| `--radius-comp-input` (0.5rem) | Outer corners of each group |

All color tokens have dark-mode values and switch automatically.

## Example

From the `Default` story:

```tsx
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@bykhd/lab-ds"

<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} aria-label="Verification code">
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
```

The stories also show `FourDigits` and `Disabled`.
