import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: "src/exports.js", // Your library's entry point
      name: "pca-plot", // The name of your library
      formats: ["es", "umd"], // Output formats
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Do not bundle React and ReactDOM
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
