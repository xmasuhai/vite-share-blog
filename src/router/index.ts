import {createRouter, /*createWebHistory*/ createWebHashHistory, RouteRecordRaw} from 'vue-router';
import useStore from '@/store';
import useAuthStore from '@/store/modules/auth';
import {storeToRefs} from 'pinia';

/* 不支持动态加载组件 component: () => import('@/pages/blog/index/BlogIndex')  改为静态导入 */
import BlogIndex from '@/pages/blog/index/BlogIndex';
import Login from '@/pages/login/Login';
import Register from '@/pages/register/Register';
import CreateBlog from '@/pages/blog/create/CreateBlog';
import EditBlog from '@/pages/blog/edit/EditBlog';
import BlogDetail from '@/pages/blog/detail/BlogDetail';
import User from '@/pages/user/User';
import MyBlog from '@/pages/myBlog/MyBlog';
import About from '@/pages/About';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'BlogIndex',
    // import('') 必须是静态字符串，不可动态拼接
    // The above dynamic import cannot be analyzed by vite
    component: BlogIndex, // 注意这里如果是.vue文件必须要带上 文件后缀.vue
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/create',
    name: 'CreateBlog',
    component: CreateBlog,
    // 只有经过身份验证的用户才能创建帖子
    meta: {requiresAuth: true},
  },
  {
    path: '/edit/:blogId',
    name: 'EditBlog',
    component: EditBlog,
    meta: {requiresAuth: true},
  },
  {
    path: '/detail/:blogId',
    name: 'BlogDetail',
    component: BlogDetail,
  },
  {
    path: '/user/:blogId',
    name: 'User',
    component: User,
    meta: {requiresAuth: true},
  },
  {
    path: '/myblog',
    name: 'MyBlog',
    component: MyBlog,
    meta: {requiresAuth: true},
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // 匹配路由元信息
  // 判断是需要登录
  const {getIsLogin,} = storeToRefs(useAuthStore());

  /*
  * if(to.path === 'login') return next();
  * if (to.path 受控页面或 未登录) return next('/login？');
  * next()
  * */

  if (to.matched.some(record => {
    return record.meta.requiresAuth;
  })) {
    if (!getIsLogin.value) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      });
    } else {
      next();
    }
  } else {
    next();
  }

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
