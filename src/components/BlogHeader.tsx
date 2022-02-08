import basic from '@/styles/basic.module.scss';
import {defineComponent} from 'vue';
import blogClass from '@/styles/blog.module.scss';
import {Button, } from 'ant-design-vue';

const BlogHeaderProps = {
  isSHow: Boolean
};

export default defineComponent({
  name: 'BlogHeader',
  props: BlogHeaderProps,
  components: {},
  setup(/*props, ctx*/) {
    console.log(blogClass);
    return {

    }
  },
  render() {
    return (
      <header class={blogClass.blogHeader}>
        <h1>Let's share</h1>
        <p>精品博客汇聚</p>
        <div>
          <Button class={basic.btn}>立即登录</Button>
          <Button class={basic.btn}>注册账号</Button>
        </div>
      </header>
    );
  }
});
