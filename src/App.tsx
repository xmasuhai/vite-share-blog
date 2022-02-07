// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// noinspection JSXNamespaceValidation

import {defineComponent, provide} from 'vue';
import appClass from '@/styles/app.module.scss'; // css modules
import BlogHeader from '@/components/BlogHeader';
import BlogFooter from '@/components/BlogFooter';
import {message} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import HelloWorld from './components/HelloWorld';

// 用defineComponent定义组件且要导出
// noinspection JSXNamespaceValidation
export default defineComponent({
  name: 'App',
  // components: {BlogHeader, BlogFooter, HelloWorld},
  props: {},
  setup(/*props, ctx*/) {
    // 将 message 方法挂载在全局
    provide('$message', message);
  },
  render: () => {
    const BlogHeaderDOM = <BlogHeader></BlogHeader>
    const BlogFooterDOM = <BlogFooter></BlogFooter>
    return (
      <div class={appClass.app}>
        {() => BlogHeaderDOM}
        <main>
          <router-view/>
          <HelloWorld msg='Vue vite' />
        </main>
        {() => BlogFooterDOM}
      </div>
    );
  },
});
