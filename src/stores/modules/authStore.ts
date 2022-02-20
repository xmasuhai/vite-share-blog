import auth from '@/api/auth';
import {defineStore} from 'pinia';

interface authState {
  user?: string | null;
  isLogin?: boolean;
  userId?: number | null;
}

const state = (): authState => {
  return {
    // 自动推导属性类型
    user: '',
    isLogin: false
  };
};

const getters = {};

export const useAuthStore = defineStore('authStore', {
  state,
  getters,
  actions: {
    setUser(payload: authState) {
      this.user = payload.user;
    },
    setLogin(payload: authState) {
      this.isLogin = payload.isLogin;
    },
    // async
    login({username, password}: Record<string, string>): Promise<void | authState> {
      return auth.login({username, password})
        .then(res => {
          this.setUser({user: res.data.data.username});
          this.setLogin({isLogin: true});

        });
    },
    async register({username, password}: Record<string, string>): Promise<authState> {
      const res = await auth.register({username, password});
      this.setUser({user: res.data.data?.username});
      this.setLogin({isLogin: true});
      return res.data; // 做进一步的处理
    },
    async checkLogin(): (Promise<Boolean>) {
      // 已处于登录状态，直接返回 true
      if (this.isLogin) {return true;}

      // 服务器 验证用户是否处于登录状态
      const res = await auth.getInfo();
      // 将返回结果的isLogin设置到本地状态
      this.setLogin({isLogin: res.data.isLogin});
      res.data.isLogin
        ? (this.setUser({user: res.data.username})) // 服务器 验证用户 已登录
        : (this.setUser({user: null})); // 服务器 验证用户 未登录

      return res.data.isLogin;
    },
    async logout() {
      await auth.logout();
      this.user = null;
      this.isLogin = false;
    }
  },
});
