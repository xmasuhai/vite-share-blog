import {computed, defineComponent,} from 'vue';
import useAuthStore from '@/store/modules/auth';
// UI lib
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
    /* Data from store Start */
    const store = useAuthStore();

    // computed
    const getUser = computed(() => {
      return store.getUser;
    });

    const getIsLogin = computed(() => {
      return store.getIsLogin;
    });

    const checkLogin = () => {
      return store.checkLogin;
    };

    const logout = () => {return store.logout;};
    /* Data from store End */

    // Comp Local Data
    const isLoginClass = computed(() => {
      return (
        getIsLogin.value
          ? [blogClass.login]
          : [blogClass.blogHeader]);
    });

    checkLogin();

    return {
      isLoginClass,
      logout,
      getUser,
      getIsLogin,
      checkLogin
    };
  },
  render() {
    const renderBtn = (btnString: string, toUrl: string = '#') => {
      return (
        <Button class={basic.blogBtn}>
          <router-link to={toUrl}>
            {btnString}
          </router-link>
        </Button>
      );
    };

    const renderUnLogin = () => {
      return (
        <>
          <p class={blogClass.tips}>
            精品博客汇聚
          </p>
          <div class={blogClass.btns}>
            {renderBtn('立即登录', '/login')}
            {renderBtn('注册账号', '/register')}
          </div>
        </>
      );
    };

    const renderLogin = () => {
      return (
        <div class={blogClass.user}>
          <i class={blogClass.editIcon}>
            Edit
          </i>
          <img class="avatar" alt="" src=""/>
          <ul>
            <li>
              <router-link to={'/myblog'}>我的主页</router-link>
            </li>
            <li>
              <a href="#" onClick={this.logout}>
                注销
              </a>
            </li>
          </ul>
        </div>
      );
    };

    return (
      <header class={classNames(...this.isLoginClass)}>
        <h1 class={blogClass.slogan}>
          Let's share
        </h1>
        {this.getIsLogin
          ? renderLogin()
          : renderUnLogin()
        }
      </header>
    );
  }
});
