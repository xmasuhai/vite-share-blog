import auth from '@/api/auth';
import {defineStore} from 'pinia';
import {authState, logString} from '@/store/modules/auth/interface';

export const useAuthStore = defineStore('authStore', {
  state: (): authState => {
    return {
      // 自动推导属性类型
      user: '',
      isLogin: false
    };
  },
  getters: {
    // 无需计算属性监听变化
    getUser: (state: authState) => state.user,
    getIsLogin: (state: authState) => state.isLogin
  },
  actions: {
    setUser(payload: authState) {
      this.user = payload.user;
    },
    setLogin(payload: authState) {
      this.isLogin = payload.isLogin;
    },
    // async Promise
    login({username, password}: logString) {
      console.log('点击了按钮');
      return auth.login({username, password})
        .then(res => {
          this.setUser({user: res.data?.username});
          this.setLogin({isLogin: true});
          console.log('res', res);
          return res;
        });
    },
    async register({username, password}: logString): Promise<authState> {
      const res = await auth.register({username, password});
      this.setUser({user: res.data?.username});
      this.setLogin({isLogin: true});
      return res; // 做进一步的处理
    },
    async checkLogin(): Promise<boolean> {
      // 已处于登录状态，直接返回 true
      if (this.isLogin) {return true;}

      // 服务器 验证用户是否处于登录状态
      const res = await auth.getInfo();

      // 将返回结果的 isLogin 设置到 本地状态
      this.setLogin({isLogin: res.isLogin});
      res.isLogin
        ? (this.setUser({user: res.data?.username})) // 服务器 验证用户 已登录
        : (this.setUser({user: null})); // 服务器 验证用户 未登录

      return res.isLogin;

    },
    async logout() {
      await auth.logout();
      this.user = null;
      this.isLogin = false;
    }
  },
});
