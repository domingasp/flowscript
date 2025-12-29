import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import boundaries from "eslint-plugin-boundaries";
import { strict as boundariesStrict } from "eslint-plugin-boundaries/config";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["src-tauri/**", "**/*.d.ts"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
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
    settings: {
      ...boundariesStrict.settings,
      "boundaries/elements": [
        { type: "app", pattern: "src/**" },
        { type: "components", pattern: "components/**" },
        {
          capture: ["featureName"],
          pattern: "features/*",
          type: "features",
        },
        { type: "views", pattern: "views/**" },
      ],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
      "boundaries/ignore": ["**/(router|main).ts", "**/*.config.ts"],
    },
    rules: {
      ...boundariesStrict.rules,
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "views",
              allow: ["features"],
            },
            {
              from: "features",
              allow: [
                "components",
                ["features", { featureName: "${from.featureName}" }],
              ],
            },
          ],
        },
      ],
    },
  },
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
