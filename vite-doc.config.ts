// vite-doc.config.ts 文档配置
// 基础配置，需要确定路径别名、配置 Vue 插件和 Markdown 插件用于对应文件的解析
import baseConfig from './vite.base.config';
import { defineConfig } from 'vite';
// plugins
import Markdown from 'vite-plugin-md';

export default defineConfig({
  ...baseConfig,
  build: {
    outDir: 'docs',
  },
  plugins: [
    Markdown(),
  ],
});
