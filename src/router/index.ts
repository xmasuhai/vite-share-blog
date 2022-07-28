import {
  createRouter,
  RouteRecordRaw
} from 'vue-router';
import {history} from '@/router/history';
import beforeEachHooks from '@/router/guard/beforeEachHooks';
import afterEachHooks from '@/router/guard/afterEachHooks';

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
    component: () => import('@/pages/login/Login'),
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
    meta: {requiresAuth: true},
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
    component: () => import('@/pages/myblog/MyBlog'),
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
  history,
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
router.beforeEach(beforeEachHooks);

// 路由全局后置守卫
router.afterEach(afterEachHooks);

export default router;
