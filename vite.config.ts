import {defineConfig, loadEnv} from 'vite';
// @types/node
// @ts-ignore
import path from 'path';

// plugins
import vue from '@vitejs/plugin-vue';
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
  /*
  ElementPlusResolver,
  VantResolver,
  HeadlessUiResolver,
  */
} from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';

//mock
import {viteMockServe} from 'vite-plugin-mock';

// 使用
// console.log(import.meta.env.VITE_APP_TITLE)
// console.log('import.meta', import.meta);
/*
*
* 在开发中，分为本地，测试，和线上三种环境，
* 需要根据不同的环境配置项目接口请求地址，
* 可以根据node提供的全局对象process.env
* */

/*
// 本地开发模式
const localEnabled: boolean = (process.env.USE_MOCK as unknown as boolean) || false;
// 生产模式
const prodEnabled: boolean = (process.env.USE_CHUNK_MOCK as unknown as boolean) || false;
*/

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, __dirname);
  return {
    // 项目根目录（index.html 文件所在的位置）
    root: './',
    // 开发或生产环境服务的公共基础路径
    base: env.VITE_RES_URL,
    // 开发模式 默认：'development'（开发模式），'production'（生产模式）
    mode: 'production',
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
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
      viteMockServe({
        // ignore: /^\_/, // 忽略的文件名
        // ↓解析根目录下的mock文件夹
        mockPath: './mock',
        /*
        localEnabled: localEnabled,  // 开发打包开关
        prodEnabled: prodEnabled, // 生产打包开关
        */
        localEnabled: true,
        supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
        watchFiles: true, // 监视文件更改
        /*
        // 下面这段代码会被注入 main.ts
        injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer';
        ();
        `,
        */
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
      // 配置 css modules 的行为
      modules: {
        scopeBehaviour: 'local',
        // generateScopedName: // default,
        localsConvention: 'camelCase',
      },
      postcss: {
        plugins: []
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
  };
});
