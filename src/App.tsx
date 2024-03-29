import {defineComponent, provide} from 'vue';

// Comps
import Layout from '@/components/Layout';

// UI  ant
import {message} from 'ant-design-vue';

// UI lib CSS Style
import 'ant-design-vue/es/button/style/index.css';
import 'ant-design-vue/es/switch/style/index.css';
import 'ant-design-vue/es/message/style/index.css';
import 'ant-design-vue/es/input/style/index.css';
import 'ant-design-vue/es/input-number/style/index.css';
import 'ant-design-vue/es/pagination/style/index.css';
import 'ant-design-vue/es/modal/style/index.css';
import 'ant-design-vue/es/skeleton/style/index.css';
import 'ant-design-vue/es/spin/style/index.css';
import 'github-markdown-css/github-markdown-light.css';

// Cover ant-design-vue
import '@/assets/style/cover-ant.scss';

// 用defineComponent定义组件且要导出
export default defineComponent({
  name: 'App',
  // components: {BlogHeader, BlogFooter, Button}, // 无需注册组件，components是用于template模板中
  setup(/*props, ctx*/) {
    // 将 message 方法挂载到全局
    provide<typeof message>('$message', message);
  },
  render: () => {
    const renderLayout = () => { return (<Layout/>);};
    return (
      renderLayout()
    );
  },
});
