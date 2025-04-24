// === vite.config.js ===
import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // GitHub Pages sets this automatically if using custom domain
  build: {
    outDir: "dist", // output folder
  },
});
