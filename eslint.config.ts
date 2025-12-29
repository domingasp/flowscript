import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import { strict as boundariesStrict } from "eslint-plugin-boundaries/config";
import perfectionist from "eslint-plugin-perfectionist";
import pluginVue from "eslint-plugin-vue";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["src-tauri/**", "**/*.d.ts", "*.config.ts"]),
  {
    extends: ["js/recommended"],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: { globals: globals.browser },
    plugins: { js },
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
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

  // #region TypeScript
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
  // #endregion

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
      "boundaries/ignore": ["**/(router|main).ts", "**/*.config.ts"],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
  // #endregion

  // #region Perfectionist
  // @ts-expect-error https://github.com/azat-io/eslint-plugin-perfectionist/issues/655
  perfectionist.configs["recommended-natural"],
  // #endregion

  // #region Disable rules
  {
    files: ["src/components/**"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  // #endregion
]);
