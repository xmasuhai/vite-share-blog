// base.ts 基础配置

// @types/node
import path from 'path';

// plugins
import vueJsx from '@vitejs/plugin-vue-jsx';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
// @ts-ignore
import removeConsole from 'vite-plugin-remove-console';

// setup name
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
// 自动引入组件和方法
import autoComponents from 'unplugin-vue-components/vite';
import {
  AntDesignVueResolver,
} from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import {resolve} from 'path';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// 文档: https://vitejs.dev/config/
export default defineConfig({
  // 项目根目录（index.html 文件所在的位置）
  root: './',
  // 开发或生产环境服务的公共基础路径
  base: './',
  // 开发模式 默认：'development'（开发模式），'production'（生产模式）
  // mode: 'production',
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      packages: resolve(__dirname, './packages'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    VueSetupExtend(),
    // unplugin-vue-components/vite
    autoComponents({
      // ui库解析器，也可以自定义
      // resolvers: [ElementPlusResolver()],
      resolvers: [
        AntDesignVueResolver(),
        /*
        ElementPlusResolver(),
        VantResolver(),
        HeadlessUiResolver(),
        */
      ],
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // valid file extensions for components.
      // 组件的有效文件扩展名
      extensions: ['vue', 'tsx'],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
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
      imports: ['vue', 'vue-router', 'pinia',/*'vue-i18n', '@vueuse/head', '@vueuse/core'*/],
      // 生成全局声明文件 .eslintrc-auto-import.json ，给eslint用
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为 'src/auto-import.d.ts'
      dts: 'src/auto-import.d.ts'
    }),
    removeConsole(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',

      /**
       * custom insert position
       * @default: body-last
       */
      inject: 'body-last', /*| 'body-first'*/

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: '__svg__icons__dom__',
    }),
  ],
  css: {
    // 配置 css modules 的行为
    modules: {
      scopeBehaviour: 'local',
      // generateScopedName: // default,
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/style/variables.scss";
        @import "@/assets/style/global.scss";
        @import "@/assets/style/reset.scss";
        @import "@/assets/style/mixin.scss";
        @import "@/assets/style/blog-article.scss";
        `,
      }
    }
  },
});
