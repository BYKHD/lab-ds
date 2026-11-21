import type { Preview } from "@storybook/react-vite"

import "./preview.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' shows violations in the test UI only; 'error' fails the run.
      test: "todo",
    },
  },
  // Theme switcher in the toolbar; dark mode is the `.dark` class on <html>.
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      document.documentElement.classList.toggle("dark", context.globals.theme === "dark")
      return <Story />
    },
  ],
}

export default preview
