import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
  server: {
    port: 4000,
    open: true,
    host: 'termite-helpful-arguably.ngrok-free.app',
    allowedHosts: ['termite-helpful-arguably.ngrok-free.app'],
  },
  // preview: {
  //   port: 4000,
  //   open: true,
  //   host: 'parallelmuhit.uz',
  // },
});