import {computed, defineComponent, ref} from 'vue';
import {Button,} from 'ant-design-vue';

// CSS module
import classNames from 'classnames';
import blogClass from '@/styles/blog.module.scss';
import basic from '@/styles/basic.module.scss';

// props
const BlogHeaderProps = {
  isSHow: Boolean
};

export default defineComponent({
  name: 'BlogHeader',
  props: BlogHeaderProps,
  setup(/*props, ctx*/) {
    const isLogin = ref(false);

    const isLoginClass = computed(() => {
      return (
        isLogin.value
          ? [blogClass.login]
          : [blogClass.blogHeader]);
    });
    return {
      isLogin,
      isLoginClass
    };
  },
  render() {
    const renderBtn = (btnString: string) => { return (<Button class={basic.blogBtn}>{btnString}</Button>); };

    const renderUnLogin = () => {
      return (
        <div class={blogClass.btns}>
          {renderBtn('立即登录')}
          {renderBtn('注册账号')}
        </div>
      );
    };

    const renderLogin = () => {
      return (
        <>
          <i>123</i>
          <img src="" alt=""/>
        </>
      );
    };

    return (
      <header class={classNames(...this.isLoginClass)}>
        <h1 class={blogClass.slogan}>Let's share</h1>
        <p class={blogClass.tips}>精品博客汇聚</p>
        {this.isLogin
          ? renderLogin()
          : renderUnLogin()
        }
      </header>
    );
  }
});
