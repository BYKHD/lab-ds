import path from "node:path"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["packages/ui/src/**/*.test.tsx"],
        },
      },
      {
        // Runs every story as a test (play functions = interaction tests).
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(import.meta.dirname, "apps/storybook/.storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
})
