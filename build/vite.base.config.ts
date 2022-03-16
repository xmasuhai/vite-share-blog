// base.ts 基础配置
// 基础配置，需要确定路径别名、配置 Vue 插件和 Markdown 插件用于对应文件的解析
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// plugins
import Markdown from 'vite-plugin-md';

// 文档: https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      packages: resolve(__dirname, './packages'),
    },
  },
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown(),
  ],
});
