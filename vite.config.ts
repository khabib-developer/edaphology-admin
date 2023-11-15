import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://husan.airi.uz",
        changeOrigin: true,
        configure: (proxy, options) => {
          console.log(proxy, options);
        },
      },
    },
  },
  preview: {
    port: 8080,
  },
});
