import {NavigationGuardWithThis} from 'vue-router';
import useAuthStore from '@/store/modules/auth';

const beforeEachHooks: NavigationGuardWithThis<undefined> = (to, from, next) => {
  // 匹配路由元信息
  // 判断是需要登录
  // const {getIsLogin,} = storeToRefs(useAuthStore()); // 使用 store.checkLogin() 服务器验证 的登录状态 代替

  const authStore = useAuthStore();
  /*
  * if(to.path === 'login') return next();
  * if (to.path 受控页面或 未登录) return next('/login？');
  * next()
  * */
  const ifRequiresAuth: boolean = to.matched.some(record => { return record.meta.requiresAuth; });

  // URL 是否需要 身份验证
  ifRequiresAuth
    ? (// 需要身份验证的 URL // 创建、编辑博客页面、我的博客页面
      authStore.checkLogin() // 向服务器请求，获取当前登录状态
        .then((isLogin) => {
          isLogin
            ? next() // 服务器响应验证已登录，放行跳转;
            : next({path: '/login', query: {redirect: to.fullPath}});
        }))
    : (// 不需要身份验证的 URL; // 博客首页、用户页面、博客详情页、登录、注册
      next()
      /*
        store.checkLogin()
          .then((isLogin) => {
            isLogin
              ? (console.log(['/login', '/register'].includes(to.path)), next()) // 服务器响应验证已登录，
              : (console.log(to.path), next());
          })
      */
    );
  /* 确保最后执行且只一次 next() */

  // 判断是否进入 注册 或 登录 的路由，先检查是否已登录
  /*
  ;['/register', '/login'].includes(to.path)
    ? (console.log('向服务器发送请求，验证登录'))
    : (console.log('不做任何处理', isLogin));
*/

};

export default beforeEachHooks