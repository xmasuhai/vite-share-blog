import {computed, defineComponent,} from 'vue';
import useAuthStore from '@/store/modules/auth';
// UI lib
import {Button,} from 'ant-design-vue';
// CSS module
import classNames from 'classnames';
import blogHeaderClass from '@/styles/blog-header.module.scss';
import basic from '@/styles/basic.module.scss';
// Comps
import SvgIcon from '@/components/SvgIcon';

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
          ? [blogHeaderClass.login]
          : [blogHeaderClass.blogHeader]);
    });
    const getLogoClass = computed(() => {
      return (
        getIsLogin.value
          ? [blogHeaderClass.logo]
          : [blogHeaderClass.logo, blogHeaderClass.defaultLogo]);
    });

    // 创建时 向服务器验证以下身份 登录状态
    checkLogin();

    return {
      getUser,
      getIsLogin,
      checkLogin,
      logout,
      isLoginClass,
      getLogoClass
    };
  },
  render() {
    // 渲染按钮组件并定义属性
    const renderBtn = (btnString: string, toUrl: string = '#') => {
      return (
        <Button class={basic.blogBtn}>
          <router-link to={toUrl}>
            {btnString}
          </router-link>
        </Button>
      );
    };

    // 未登录状态 显示登录注册按钮
    const renderUnLogin = () => {
      return (
        <>
          <p class={blogHeaderClass.tips}>
            精品博客汇聚
          </p>
          <div class={blogHeaderClass.btns}>
            {renderBtn('立即登录', '/login')}
            {renderBtn('注册账号', '/register')}
          </div>
        </>
      );
    };

    // 已登录状态 显示用户头像和创建图标
    const renderLogin = () => {
      return (
        <div class={blogHeaderClass.user}>
          <router-link to={'/create'}>
            <i class={blogHeaderClass.editIcon}>
              <SvgIcon name="create"
                       color="white"/>
            </i>
          </router-link>
          <img class={blogHeaderClass.avatar}
               src={this.getUser?.avatar}
               alt={this.getUser?.username}
               title={this.getUser?.username}/>

          <ul class={blogHeaderClass.menu}>
            <li>
              <router-link to={'/myblog'}
                           class={blogHeaderClass.link}>
                我的主页
              </router-link>
            </li>
            <li>
              <a href="#"
                 onClick={this.logout}
                 class={blogHeaderClass.link}>
                注销
              </a>
            </li>
          </ul>
        </div>
      );
    };

    return (
      <header class={classNames(...this.isLoginClass)}>
        <h1 class={blogHeaderClass.slogan}>
          <router-link to={'/'}>
            <span>
             Tree Hole
            </span>
            <SvgIcon name="boke-logo"
                     color="yellowgreen"
                     class={classNames(...this.getLogoClass)}/>
            <em class={blogHeaderClass.em}> Let's share</em>
          </router-link>
        </h1>
        {this.getIsLogin
          ? renderLogin()
          : renderUnLogin()
        }
      </header>
    );
  }
});
