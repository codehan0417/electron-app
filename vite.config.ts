import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { viteElectronDev } from "./plugins/vite.electron.dev";
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), viteElectronDev()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
