// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue';
import {defineComponent} from 'vue';
import appClass from '@/styles/app.module.scss'; // css modules
import logoImg from '@/assets/logo.png'; // static assets

// 用defineComponent定义组件且要导出
// noinspection JSXNamespaceValidation
export default defineComponent({
  render: () => (
    <main class={appClass.app}>
      <img alt="Vue logo" src={logoImg}/>
      <HelloWorld msg="Hello Vue 3 + TypeScript + Vite"/>
      <router-link to="/">Home</router-link>
      &nbsp;
      <router-link to="/login">登录</router-link>
      &nbsp;
      <router-link to="/register">注册</router-link>
      &nbsp;
      <router-link to="/create">新建博客</router-link>
      &nbsp;
      <router-link to="/edit">编辑博客</router-link>
      &nbsp;
      <router-link to="/detail">博客详情</router-link>
      &nbsp;
      <router-link to="/myblog">我的博客</router-link>
      &nbsp;
      <router-link to="/about">关于</router-link>
      &nbsp;
      <router-view/>
    </main>
  ),
});
