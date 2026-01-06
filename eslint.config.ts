import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import { strict as boundariesStrict } from "eslint-plugin-boundaries/config";
import perfectionist from "eslint-plugin-perfectionist";
import pluginVue from "eslint-plugin-vue";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import betterTailwindCss from "eslint-plugin-better-tailwindcss";
import tailwindVariants from "eslint-plugin-tailwind-variants";

export default defineConfig([
  globalIgnores([
    "src-tauri/**",
    "**/*.d.ts",
    "*.config.ts",
    "dist",
    "node_modules",
  ]),
  {
    extends: ["js/recommended"],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: { globals: globals.browser },
    plugins: { js },
  },
  tseslint.configs.recommended,

  // #region Vue
  ...pluginVue.configs["flat/essential"].map((config) => ({
    ...config,
    files: ["**/*.vue"],
  })),
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      "vue/multi-word-component-names": [
        "error",
        { ignores: ["Example", "Second"] },
      ],
    },
  },
  // #endregion Vue

  // #region TypeScript
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
  // #endregion TypeScript

  // #region Boundaries
  {
    files: ["**/*.{ts,vue}"],
    plugins: { boundaries },
    rules: {
      ...boundariesStrict.rules,
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              allow: ["features"],
              from: "views",
            },
            {
              allow: [
                "components",
                ["features", { featureName: "${from.featureName}" }],
              ],
              from: "features",
            },
          ],
        },
      ],
    },
    settings: {
      ...boundariesStrict.settings,
      "boundaries/elements": [
        { pattern: "src/**", type: "app" },
        { pattern: "components/**", type: "components" },
        {
          capture: ["featureName"],
          pattern: "features/*",
          type: "features",
        },
        { pattern: "views/**", type: "views" },
      ],
      "boundaries/ignore": [
        "**/(router|main).ts",
        "**/*.config.ts",
        "scripts/*",
      ],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
  // #endregion Boundaries

  // #region Perfectionist
  {
    ...perfectionist.configs["recommended-natural"],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
  },
  // #endregion Perfectionist

  // #region Tailwind CSS
  {
    files: ["**/*.{ts,vue}"],
    plugins: { "better-tailwindcss": betterTailwindCss },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/styles/globals.css",
      },
    },
    rules: {
      ...betterTailwindCss.configs["recommended-warn"].rules,
      ...betterTailwindCss.configs["recommended-error"].rules,
    },
  },
  ...tailwindVariants.configs.recommended,
  // #endregion Tailwind CSS

  // #region Disable rules
  {
    files: ["src/components/**"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  // #endregion Disable rules
]);
