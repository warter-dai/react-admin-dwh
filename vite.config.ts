import { resolve } from "node:path";

// import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import postcssNesting from "postcss-nesting";
// import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";

import type { ConfigEnv, UserConfig } from "vite";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const date = new Date().getTime();
  const root = process.cwd();
  const envConfig = loadEnv(mode, root);
  return defineConfig({
    plugins: [
      react(),

      // gz包
      {
        ...viteCompression(),
        apply: "build",
      },
      // 分析生成包的大小
      // visualizer({
      //   open: true,
      // }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      extensions: [".ts", ".tsx", ".js", "jsx"],
    },
    base: envConfig.VITE_PUBLIC_PATH,

    server: {
      port: Number(envConfig.VITE_APP_PORT),
      proxy: {
        "/openApi": {
          target: "http://localhost:8082",
          changeOrigin: true, // 更改请求头中的 Origin，以匹配目标服务器的协议、主机和端口
          secure: false,
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "@/assets/style/global.less"; ',
        },
      },
      transformer: "lightningcss",
      lightningcss: {
        targets: browserslistToTargets(browserslist(">= 0.25%")),
      },
      postcss: {
        plugins: [postcssNesting],
      },
    },
    build: {
      cssCodeSplit: true,
      cssMinify: "lightningcss",
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            lib: ["zustand"],
            antd: ["antd"],
          },
          chunkFileNames: `static/js/chunkFileName-[name]-${date}.js`,
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  });
};
