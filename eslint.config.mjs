
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      // ✅ Disallow extra blank lines
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      // ✅ Enforce single quotes
      quotes: ['error', 'single', { avoidEscape: true }],
      // ✅ Enforce 2-space indentation
      indent: ['error', 2],
      // ✅ Enforce semicolons
      semi: ['error', 'always'],
    }
  }),
];

export default eslintConfig;
