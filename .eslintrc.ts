module.exports = {
  parser: "@typescript-eslint/parser", // Define o parser para TypeScript
  parserOptions: {
    ecmaVersion: 2020, // Permite recursos modernos do ECMAScript
    sourceType: "module",
    project: "./tsconfig.json", // Necessário para regras que dependem do type-checking
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // Recomendações para TypeScript
    "plugin:prettier/recommended", // Habilita o eslint-plugin-prettier e exibe erros de formatação como erros do ESLint
    "prettier", // Deve ser sempre o último para desabilitar regras conflitantes com o Prettier
  ],
  rules: {
    // Exemplo de regra: torna erros do Prettier erros do ESLint
    "prettier/prettier": "error",
    // Outras regras personalizadas podem ser adicionadas aqui
  },
};
