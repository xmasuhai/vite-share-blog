import {computed, defineComponent, ref} from 'vue';
import {Button,} from 'ant-design-vue';

// CSS module
import classNames from 'classnames';
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
    const isLogin = ref(false);

    const isLoginClass = computed(() => {
      console.log(blogClass.login);
      return (
        isLogin
          ? [blogClass.blogHeader, blogClass.login]
          : [blogClass.blogHeader]);
    });
    return {
      isLogin,
      isLoginClass
    };
  },
  render() {
    const renderBtn = (btnString: string) => (<Button class={basic.blogBtn}>{btnString}</Button>);
    const renderUnLogin = () => (
      <div class={blogClass.btns}>
        {renderBtn('立即登录')}
        {renderBtn('注册账号')}
      </div>
    );

    const renderLogin = () => (
      <>
        <i>123</i>
        <img src="" alt=""/>
      </>
    );

    return (
      <header class={classNames(...this.isLoginClass)}>
        <h1>Let's share</h1>
        <p>精品博客汇聚</p>
        {this.isLogin
          ? renderLogin()
          : renderUnLogin()
        }
      </header>
    );
  }
});
