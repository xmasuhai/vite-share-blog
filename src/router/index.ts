import {createRouter, /*createWebHistory*/ createWebHashHistory, RouteRecordRaw} from 'vue-router';
import {storeToRefs} from 'pinia';
import useStore from '@/store';
import useAuthStore from '@/store/modules/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'BlogIndex',
    // import('') 必须是静态字符串，不可动态拼接
    component: () => import('@/pages/blog/index/BlogIndex'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/register/Register'),
  },
  {
    path: '/detail/:blogId',
    name: 'BlogDetail',
    component: () => import('@/pages/blog/detail/BlogDetail'),
  },
  {
    path: '/create',
    name: 'CreateBlog',
    component: () => import('@/pages/blog/create/CreateBlog'),
    // 只有经过身份验证的用户才能创建帖子
    meta: {requiresAuth: true},
  },
  {
    path: '/edit/:blogId',
    name: 'EditBlog',
    component: () => import('@/pages/blog/edit/EditBlog'),
    meta: {requiresAuth: true},
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: () => import('@/pages/user/User'),
    meta: {requiresAuth: true},
  },
  {
    path: '/myblog',
    name: 'MyBlog',
    component: () => import('@/pages/myBlog/MyBlog'),
    meta: {requiresAuth: true},
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/pages/About')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
/*  scrollBehavior(to, from, savedPosition) {
    // 模拟 “滚动到锚点”，并开启流畅滚动
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    // 始终滚动到顶部
    // return {top: 0};
  }*/
});

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // 匹配路由元信息
  // 判断是需要登录
  // const {getIsLogin,} = storeToRefs(useAuthStore()); // 使用 store.checkLogin() 服务器验证 的登录状态 代替

  const store = useAuthStore();
  /*
  * if(to.path === 'login') return next();
  * if (to.path 受控页面或 未登录) return next('/login？');
  * next()
  * */
  const ifRequiresAuth: boolean = to.matched.some(record => { return record.meta.requiresAuth; });

  // URL 是否需要 身份验证
  ifRequiresAuth
    ? (// 需要身份验证的 URL
      store.checkLogin() // 向服务器请求，获取当前登录状态
        .then((isLogin) => {
          !isLogin
            ? next({path: '/login', query: {redirect: to.fullPath}})
            : next(); // 服务器响应验证已登录
        }))
    : next(); // 不需要身份验证的 URL;
  /* 确保最后执行且只一次 next() */

  // 判断是否进入 注册 或 登录 的路由，先检查是否已登录
  /*
  ;['/register', '/login'].includes(to.path)
    ? (console.log('向服务器发送请求，验证登录'))
    : (console.log('不做任何处理', isLogin));
*/

});

// 路由全局后置守卫
router.afterEach((/* to, from, failure */) => {
  // console.log('路由全局后置守卫', to, from);

  // 清除 记录的 router-view 中的 组件名
  const {routerCompName,} = storeToRefs(useStore());
  routerCompName.value = '';
});

export default router;
