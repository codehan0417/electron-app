// 生产环境的插件

import type { Plugin } from "vite";
import fs from "node:fs";
import * as ElectronBuilder from "electron-builder";
import path from "node:path";
const initElectron = () => {
  // 使用esbuild编译TypeScript代码为JavaScript
  require("esbuild").buildSync({
    entryPoints: ["src/background.ts"],
    bundle: true,
    outfile: "dist/background.js",
    platform: "node",
    // target: 'node12',
    external: ["electron"],
  });
};

export const ElectronBuildPlugin = (): Plugin => {
  return {
    name: "electron-build",
    closeBundle() {
      initElectron();
      // electron-builder 需要指定package.json main
      const json = JSON.parse(fs.readFileSync("package.json", "utf-8"));
      json.main = "background.js";
      fs.writeFileSync("dist/package.json", JSON.stringify(json, null, 4));
      // bug electron-builder 会下载垃圾文件
      fs.mkdirSync("dist/node_modules", { recursive: true });
      ElectronBuilder.build({
        config: {
          directories: {
            // 输出文件
            output: path.resolve(process.cwd(), "release"),
            app: path.resolve(process.cwd(), "dist"),
          },
          asar: true,
          appId: "com.example.electron",
          productName: "electron-vite",
          nsis: {
            oneClick: false, // 取消一键安装
            allowToChangeInstallationDirectory: true, // 允许用户选择安装路径
          },
        },
      });
    },
  };
};
