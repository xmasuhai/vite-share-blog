// doc.ts 文档配置
import baseConfig from './vite.base.config';
import { defineConfig } from 'vite';

export default defineConfig({
  ...baseConfig,
  build: {
    outDir: 'docs',
  },
});
