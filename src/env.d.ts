/// <reference types="vite/client" />

declare module '*.vue' {
  import {DefineComponent} from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
  VITE_MODE_NAME: string,
  VITE_RES_URL: string,

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}