module.exports = {
    root: true,
    env: {
      es2020: true,
      node: false,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 2020, // Node.js 12の場合は2019、他のバージョンのNode.jsを利用している場合は場合は適宜変更する
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.eslint.json']
    },
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
    //   'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    rules: {
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-namespace': 'warn',
      'no-irregular-whitespace': 'warn'
    },
  };
