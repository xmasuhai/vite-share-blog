import {defineStore} from 'pinia';
import StoreTypes from '@/store/interface';

type getPageInit = Pick<StoreTypes, 'pageInit'>;
type getAjaxCount = Pick<StoreTypes, 'ajaxCount'>;

export const useStore = defineStore('Store', {
  state: (): StoreTypes => {
    return {
      // 自动推导属性类型
      routerCompName: '',
      isShowHeaderFooter: true,
      pageInit: false,
      ajaxCount: 0, // 记录有几个 ajax 请求正在执行中
    };
  },
  getters: {
    getRouterCompName: (state: StoreTypes) => {return state.routerCompName;},
    getShowHeaderFooter: (state: StoreTypes) => {return state.isShowHeaderFooter;},
    getPageInit: (state: StoreTypes) => {return state.pageInit;},
    getAjaxCount: (state: StoreTypes) => {return state.ajaxCount;},
  },
  actions: {
    updatePageInit(payload: getPageInit) {
      this.pageInit = payload.pageInit;
    },
    updateAjaxCount(payload: getAjaxCount) {
      this.ajaxCount = this.ajaxCount + payload.ajaxCount;

    }
  }
});
