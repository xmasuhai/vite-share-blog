// Comps
import SvgIcon from '@/components/SvgIcon';
import router from '@/router';
import useAuthStore from '@/store/modules/auth';
import basic from '@/styles/basic.module.scss';
import blogHeaderClass from '@/styles/blog-header.module.scss';
// UI lib
import {Button,} from 'ant-design-vue';
// CSS module
import classNames from 'classnames';
import {computed, defineComponent, onMounted,} from 'vue';

// props
const BlogHeaderProps = {
  isSHow: Boolean
};

export default defineComponent({
  name: 'BlogHeader',
  props: BlogHeaderProps,
  setup(/*props, ctx*/) {
    /* Data from store Start useAuthStore() */
    const authStore = useAuthStore();
    // computed
    const getUser = computed(() => {
      return authStore.getUser;
    });
    const getIsLogin = computed(() => {
      return authStore.getIsLogin;
    });
    // actions
    const checkLogin = async (): Promise<boolean> => {
      return await authStore.checkLogin();
    };

    // 登出后 重新刷新页面
    const logout = async () => {
      await authStore.logout();
      await router.push({path: '/'});
      window.location.reload();
    };
    /* Data from store End */

    const routerToIndex = async () => {
      await router.push({path: '/'});
      window.location.reload();
    };

    // Comp Local Data
    // CSS modules
    const isLoginClass = computed(() => {
      return (
        getIsLogin.value
          ? [blogHeaderClass.logged]
          : [blogHeaderClass.blogHeader]);
    });

    const getLogoClass = computed(() => {
      return (
        getIsLogin.value
          ? [blogHeaderClass.logo]
          : [blogHeaderClass.logo, blogHeaderClass.defaultLogo]);
    });

    onMounted(async () => {
      // 创建时 向服务器验证以下身份 登录状态
      await checkLogin();
    });

    return {
      getUser,
      getIsLogin,
      checkLogin,
      logout,
      routerToIndex,
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
            <em class={blogHeaderClass.editIcon}>
              <SvgIcon name="create"
                       color="white"/>
            </em>
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

    const renderBlogTitleLogo = () => {
      return (
        <h1 class={blogHeaderClass.slogan}>
          <router-link to={'/'}
                       onClick={this.routerToIndex}>
            <span>
              Tree Hole
            </span>
            <SvgIcon name="boke-logo"
                     color="yellowgreen"
                     class={classNames(...this.getLogoClass)}/>
            <em class={blogHeaderClass.em}> Let's share</em>
          </router-link>
        </h1>
      );
    };

    return (
      <header class={classNames(...this.isLoginClass)}>
        {renderBlogTitleLogo()}
        {this.getIsLogin
          ? renderLogin()
          : renderUnLogin()
        }
      </header>
    );
  }
});
