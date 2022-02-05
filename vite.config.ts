import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
// 自动引入组件和方法
import autoComponents from 'unplugin-vue-components/vite';
import {
  ElementPlusResolver,
  AntDesignVueResolver,
  VantResolver,
  HeadlessUiResolver,
} from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // unplugin-vue-components/vite
    autoComponents({
      // ui库解析器，也可以自定义
      // resolvers: [ElementPlusResolver()],
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver(),
        VantResolver(),
        HeadlessUiResolver(),
      ],
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // valid file extensions for components.
      // 组件的有效文件扩展名
      extensions: ['vue', 'tsx'],
      // 配置文件生成位置
      dts: 'src/components/components.d.ts',
      // search for subdirectories
      // 搜索子目录
      deep: true,
      // Allow subdirectories as namespace prefix for components.
      // 允许子目录作为组件的命名空间前缀。
      directoryAsNamespace: false,
      // filters for transforming targets
      include: [/.vue$/, /.vue?vue/],
      exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // global imports to register
      imports: ['vue', 'vue-router', /*'vue-i18n', '@vueuse/head', '@vueuse/core'*/],
      // 生成全局声明文件 .eslintrc-auto-import.json ，给eslint用
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为 'src/auto-import.d.ts'
      // dts: 'src/auto-import.d.ts'
    }),
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
