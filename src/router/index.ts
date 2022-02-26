import {Ref} from 'vue';
import {createRouter, /*createWebHistory*/ createWebHashHistory, RouteRecordRaw} from 'vue-router';
import useAuthStore from '@/store/modules/auth';
import {storeToRefs} from 'pinia';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'BlogIndex',
    // import('') 必须是静态字符串，不可动态拼接
    // The above dynamic import cannot be analyzed by vite
    component: () => import('@/pages/blog/index/BlogIndex'), // 注意这里如果是.vue文件必须要带上 文件后缀.vue
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/register/Register'),
  },
  {
    path: '/create',
    name: 'CreateBlog',
    component: () => import('@/pages/blog/create/CreateBlog'),
  },
  {
    path: '/edit',
    name: 'EditBlog',
    component: () => import('@/pages/blog/edit/EditBlog'),
  },
  {
    path: '/detail',
    name: 'BlogDetail',
    component: () => import('@/pages/blog/detail/BlogDetail'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/pages/user/User'),
  },
  {
    path: '/myblog',
    name: 'MyBlog',
    component: () => import('@/pages/myblog/MyBlog'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "About" */ '@/pages/About')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  const {/* count, name, list, */isLogin,} = storeToRefs(useAuthStore());
  // 是否进入 注册 或 登录 的路由
  ;['/register', '/login'].includes(to.path)
    ? (((isLogin as Ref<boolean>).value = true))
    : (((isLogin as Ref<boolean>).value = false));

  /*
  * if(to.path === 'login') return next();
  * if (to.path 受控页面或 未登录) return next('/login？');
  * next()
  * */

  next();
});

// 路由全局后置守卫
router.afterEach((/*to, from, next*/) => {
  // console.log('路由全局后置守卫', to, from);
  // next();
});

export default router;
