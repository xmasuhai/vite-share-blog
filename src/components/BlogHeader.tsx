import {defineComponent} from 'vue';
import {Button, } from 'ant-design-vue';
// CSS module
import blogClass from '@/styles/blog.module.scss';
import basic from '@/styles/basic.module.scss';

const BlogHeaderProps = {
  isSHow: Boolean
};

export default defineComponent({
  name: 'BlogHeader',
  props: BlogHeaderProps,
  components: {},
  setup(/*props, ctx*/) {
    return {

    }
  },
  render() {
    return (
      <header class={blogClass.blogHeader}>
        <h1>Let's share</h1>
        <p>精品博客汇聚</p>
        <div>
          <Button class={basic.blogBtn}>立即登录</Button>
          <Button class={basic.blogBtn}>注册账号</Button>
        </div>
      </header>
    );
  }
});
