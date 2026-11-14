import { readFile, rm, writeFile } from "node:fs/promises"
import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  // Bundling drops per-file directives; the whole entry is client-side.
  banner: { js: '"use client";' },
  // CSS modules go through postcss.config.mjs (Tailwind), then esbuild scopes
  // their class names; the compiled rules land in dist/index.css.
  loader: { ".css": "local-css" },
  // styles.css = tokens/@theme (for the consumer's Tailwind) + compiled components.
  async onSuccess() {
    const [theme, components] = await Promise.all([
      readFile("src/styles/theme.css", "utf8"),
      readFile("dist/index.css", "utf8"),
    ])
    await writeFile("dist/styles.css", `${theme}\n/* lab-ds components */\n${components}`)
    await rm("dist/index.css") // now inside styles.css; not exported
  },
})
