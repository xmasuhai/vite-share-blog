import StoreTypes from '@/store/interface';
import {defineStore} from 'pinia';

export const useStore = defineStore('Store', {
  state: (): StoreTypes => {
    return {
      // 自动推导属性类型
      routerCompName: '',
      isShowHeaderFooter: true,
    };
  },
  getters: {
    getRouterCompName: (state: StoreTypes) => {return state.routerCompName;},
    getShowHeaderFooter: (state: StoreTypes) => {return state.isShowHeaderFooter;},
  },
});
