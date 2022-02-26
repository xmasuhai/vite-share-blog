import auth from '@/api/auth';
import {defineStore} from 'pinia';
import AuthModuleTypes, {logString} from '@/store/modules/auth/interface';

type getUser = Pick<AuthModuleTypes, 'userData'>;
type getIsLogin = Pick<AuthModuleTypes, 'isLogin'>;

export const useAuthStore = defineStore('authStore', {
  state: (): AuthModuleTypes => {
    return {
      // 自动推导属性类型
      userData: null,
      isLogin: false
    };
  },
  getters: {
    // 无需计算属性监听变化
    getUser: (state: AuthModuleTypes) => state.userData,
    getIsLogin: (state: AuthModuleTypes) => state.isLogin
  },
  actions: {
    setUser(payload: getUser) {
      this.userData = payload.userData;
    },
    setLogin(payload: getIsLogin) {
      this.isLogin = payload.isLogin;
    },
    // async Promise
    login({username, password}: logString) {
      return auth.login({username, password})
        .then(res => {
          this.setUser({userData: res.data});
          this.setLogin({isLogin: true});
          return res;
        });
    },
    async register({username, password}: logString): Promise<unknown> {
      const res = await auth.register({username, password});
      this.setUser({userData: res.data});
      this.setLogin({isLogin: true});
      return res; // 做进一步的处理
    },
    async checkLogin(): Promise<boolean> {
      // 已处于登录状态，直接返回 true，短路先验
      if (this.isLogin) {return true;}

      // 处于非登录状态
      // 向服务器发出 auth.getInfo() 请求，验证用户是否处于登录状态
      const res = await auth.getInfo();

      // 将返回结果的 isLogin 设置到 本地状态
      this.setLogin({isLogin: res.isLogin});
      res.isLogin
        ? (this.setUser({userData: res.data})) // 服务器 验证用户 已登录
        : (this.setUser({userData: null})); // 服务器 验证用户 未登录

      return res.isLogin;

    },
    async logout() {
      await auth.logout();
      // 注销用户
      this.userData = null;
      this.isLogin = false;
    }
  },
});
