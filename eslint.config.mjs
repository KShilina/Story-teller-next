import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ Global ignore patterns
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  // ✅ Default rule settings for everything
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },

  // ✅ Override rule for specific folders
  {
    files: ["**/tests/**/*.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}", "**/api/**/*.{ts,tsx}", "**/scripts/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;