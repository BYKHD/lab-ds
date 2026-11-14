import { fireEvent, render, screen } from "@testing-library/react"
import { expect, it, vi } from "vitest"

import { Button } from "./Button"

it("renders with its variant props and handles clicks", () => {
  const onClick = vi.fn()
  render(
    <Button variant="outline" size="sm" className="extra" onClick={onClick}>
      Save
    </Button>
  )
  const button = screen.getByRole("button", { name: "Save" })
  expect(button.dataset.variant).toBe("outline")
  expect(button.dataset.size).toBe("sm")
  expect(button.className).toContain("extra")
  fireEvent.click(button)
  expect(onClick).toHaveBeenCalledOnce()
})
