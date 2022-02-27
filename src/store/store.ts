import StoreTypes from '@/store/interface';
import {defineStore} from 'pinia';

export const useStore = defineStore('Store', {
  state: (): StoreTypes => {
    return {
      // 自动推导属性类型
      routerCompName: '',
    };
  },
  getters: {
    getRouterCompName: (state: StoreTypes) => {return state.routerCompName;}
  },
  actions: {},
});
