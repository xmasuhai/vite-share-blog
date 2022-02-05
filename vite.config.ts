import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
// 自动引入组件
import autoComponents from 'unplugin-vue-components/vite';
import {
  ElementPlusResolver,
  AntDesignVueResolver,
  VantResolver,
  HeadlessUiResolver,
} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    autoComponents({
      // ui库解析器，也可以自定义
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver(),
        VantResolver(),
        HeadlessUiResolver(),
      ],
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      // resolvers: [ElementPlusResolver()],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts'
    })
  ],
  server: {
    host: '0.0.0.0' // 解决  Network: use --host to expose
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/main.scss";'
      }
    }
  },
});
