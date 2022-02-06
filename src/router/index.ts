import {createRouter, /*createWebHistory*/ createWebHashHistory, RouteRecordRaw} from 'vue-router';

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

export default router;
