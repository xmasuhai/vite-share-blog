import auth from '@/api/auth';
import {defineStore} from 'pinia';

interface authState {
  user?: string;
  isLogin?: boolean;
  userId?: number | null;
}

const state = (): authState => {
  return {
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
    login({username, password}: Record<string, string>) {
      return auth.login({username, password})
        .then(res => {
          this.setUser({user: res.data.username});
          this.setLogin({isLogin: true});
        });
    }
  },
});
