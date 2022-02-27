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
    /* Data from store Start useAuthStore() */
    const store = useAuthStore();

    // computed
    const getUser = computed(() => {
      return store.getUser;
    });

    const getIsLogin = computed(() => {
      return store.getIsLogin;
    });

    // actions
    const checkLogin = () => {
      store.checkLogin();
    };

    const logout = () => {
      store.logout();
    };
    /* Data from store End */

    // Comp Local Data
    // CSS modules
    const isLoginClass = computed(() => {
      return (
        getIsLogin.value
          ? [blogClass.login]
          : [blogClass.blogHeader]);
    });

    // 创建时 向服务器验证以下身份 登录状态
    checkLogin();

    return {
      getUser,
      getIsLogin,
      checkLogin,
      logout,
      isLoginClass,
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
          <img class={blogClass.avatar}
               src={this.getUser?.avatar}
               alt={this.getUser?.username}
               title={this.getUser?.username}/>

          <ul class={blogClass.menu}>
            <li>
              <router-link to={'/myblog'}
                           class={blogClass.link}>
                我的主页
              </router-link>
            </li>
            <li>
              <a href="#"
                 onClick={this.logout}
                 class={blogClass.link}>
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
