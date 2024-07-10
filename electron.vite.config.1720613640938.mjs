// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@/lib": resolve("src/main/lib"),
        "@shared": resolve("src/shared")
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@shared": resolve("src/shared"),
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [react()]
  }
});
export {
  electron_vite_config_default as default
};
