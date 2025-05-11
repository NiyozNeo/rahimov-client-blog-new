import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
  build: {
    minify: false,
  },
  server: {
    port: 4000,
    open: true,
    host: 'termite-helpful-arguably.ngrok-free.app',
    allowedHosts: ['termite-helpful-arguably.ngrok-free.app','b.parallelmuhit.uz'],
  },
  preview: {
    port: 4000,
    open: true,
    host: 'parallelmuhit.uz',
    allowedHosts: ['parallelmuhit.uz'],
  },
});