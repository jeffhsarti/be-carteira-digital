import { defineConfig } from "vite";

export default defineConfig(async () => {
  // Importa o plugin de forma dinâmica, garantindo que seja carregado como ESM
  const tsconfigPaths = (await import("vite-tsconfig-paths")).default;

  return {
    plugins: [tsconfigPaths()],
  };
});
