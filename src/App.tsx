import {defineComponent, provide} from 'vue';

// Comps
import BlogHeader from '@/components/BlogHeader';
import BlogFooter from '@/components/BlogFooter';
import {message} from 'ant-design-vue';

// CSS Style
import 'ant-design-vue/es/button/style/index.css';
import 'ant-design-vue/es/message/style/index.css';
import appClass from '@/styles/app.module.scss'; // css modules

// 用defineComponent定义组件且要导出
export default defineComponent({
  name: 'App',
  // components: {BlogHeader, BlogFooter, Button},
  setup(/*props, ctx*/) {
    // 将 message 方法挂载在全局
    provide('$message', message);
  },
  render: () => {
    const renderBlogHeader = () => {return (<BlogHeader class={appClass.blogHeader}/>);};
    const renderBlogFooter = () => {return (<BlogFooter class={appClass.blogFooter}/>);};
    return (
      <div class={appClass.app}>
        {renderBlogHeader()}
        <main class={appClass.blogMain}>
          <router-view/>
        </main>
        {renderBlogFooter()}
      </div>
    );
  },
});
