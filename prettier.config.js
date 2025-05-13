/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  singleQuote: false,
  jsxSingleQuote: false,
  semi: false,
  endOfLine: "lf",
  trailingComma: "all",
  tabWidth: 2,
  printWidth: 80,
}
