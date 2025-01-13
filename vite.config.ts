import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { viteElectronDev } from "./plugins/vite.electron.dev";
import { ElectronBuildPlugin } from "./plugins/vite.electron.build";
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), viteElectronDev(),ElectronBuildPlugin()],
  base: "./",//默认是绝对路径 改成相对路径 不然会白屏
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
