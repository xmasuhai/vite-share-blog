import {computed, defineComponent, ref} from 'vue';

// UI lib
import {Button,} from 'ant-design-vue';

// CSS module
import classNames from 'classnames';
import blogClass from '@/styles/blog.module.scss';
import basic from '@/styles/basic.module.scss';
// import axios from 'axios';

// props
const BlogHeaderProps = {
  isSHow: Boolean
};

export default defineComponent({
  name: 'BlogHeader',
  props: BlogHeaderProps,
  setup(/*props, ctx*/) {

    /*
    axios.get('/api/getUser')
      .then(res => {
        console.log('res', res);
      });
    */

    const isLogin = ref(true);

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
    const renderBtn = (btnString: string) => {
      return (
        <Button class={basic.blogBtn}>{btnString}</Button>
      );
    };

    const renderUnLogin = () => {
      return (
        <>
          <p class={blogClass.tips}>精品博客汇聚</p>
          <div class={blogClass.btns}>
            {renderBtn('立即登录')}
            {renderBtn('注册账号')}
          </div>
        </>
      );
    };

    const renderLogin = () => {
      return (
        <div class={blogClass.user}>
          <i class={blogClass.editIcon}>Edit</i>
          <img class={blogClass.avatar}
               src="https://cn.gravatar.com/avatar/1?s=128&d=identicon"
               alt="avatar"/>
        </div>
      );
    };

    return (
      <header class={classNames(...this.isLoginClass)}>
        <h1 class={blogClass.slogan}>Let's share</h1>
        {this.isLogin
          ? renderLogin()
          : renderUnLogin()
        }
      </header>
    );
  }
});
