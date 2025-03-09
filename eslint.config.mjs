import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import js from '@eslint/js';
import tslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import unusedImport from 'eslint-plugin-unused-imports';

export default tslint.config(
  {
    plugins: {
      ['@typescript-eslint']: tslint.plugin,
      ['jsx-a11y']: jsxA11yPlugin,
      ['react-hooks']: reactHooksPlugin,
      ['unused-imports']: unusedImport,
      ['react']: reactPlugin,
      ['simple-import-sort']: simpleImportSortPlugin,
    },
  },
  {
    ignores: [
      '**/node_modules',
      '**/dist',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tslint.parser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-console': 'off',
      quotes: ['error', 'single'],
      eqeqeq: 'warn',
      curly: 'error',
      'react-refresh/only-export-components': [
        'off',
        { allowConstantExport: true },
      ],
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      "jsx-a11y/label-has-associated-control": ["off", {
        "required": {
          "some": ["nesting", "id"]
        }
      }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react'],
            ['(^@.+)'],
            ['^zustand'],
            ['^zod'],

            ['^src/app'],
            ['^src/processes'],
            ['^src/pages'],
            ['^src/widgets'],
            ['^src/features'],
            ['^src/entities'],
            ['^src/shared'],

            ['^\\./*', '^./\\w+$', '^\\.\\./*'],
            ['(.json)'],
            ['(.svg|.png)'],
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
);
