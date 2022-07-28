import { NavigationHookAfter} from 'vue-router';
import {storeToRefs} from 'pinia';
import useStore from '@/store';

const afterEachHooks:  NavigationHookAfter = (/*to, from, failure*/) => {
// console.log('路由全局后置守卫', to, from);

  const {routerCompName} = storeToRefs(useStore());
  const store = useStore();

  // 清除 记录的 router-view 中的 组件名
  routerCompName.value = '';

  // 对 pageInit 的值进行更新，设置为刚打开页面的状态
  store.updatePageInit({pageInit: true});
};

export default afterEachHooks;