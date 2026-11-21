// Vite's `?raw` import: the file's contents as a string (used to show guideline .md files in Storybook).
declare module "*.md?raw" {
  const content: string
  export default content
}
