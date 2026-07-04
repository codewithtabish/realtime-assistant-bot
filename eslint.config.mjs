import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  {
    rules: {
      // Ignore hydration and nested button warnings temporarily
      "react/no-unescaped-entities": "off",
      "react/button-has-type": "off",
      "@typescript-eslint/no-unused-vars": "warn",

      // Suppress specific React warnings
      "react-hooks/exhaustive-deps": "warn",

      // ====================== ALLOW 'any' TYPE ======================
      "@typescript-eslint/no-explicit-any": "off",        // ← This allows `any`
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      // ============================================================
    },
  },
]);

export default eslintConfig;