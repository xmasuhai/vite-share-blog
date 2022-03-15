import router from '@/router';
import useAuthStore from '@/store/modules/auth';
import {message} from 'ant-design-vue';

// 先验证是否已登录
// 已登录 跳转至首页
// 未登录 显示登录页面
export const useCheckIsLogin = () => {
  return async () => {
    const authStore = useAuthStore();
    const popMessage = inject<typeof message>('$message');
    // 创建时 向服务器验证以下身份 登录状态
    const isLogin = await authStore.checkLogin();
    ;(isLogin === true
        ? popMessage && popMessage.info('您已登录，为您跳转至首页') && await router.push({path: '/'})// 服务器 验证用户 已登录
        : () => {} // 服务器 验证用户 未登录
    );
  };
};
