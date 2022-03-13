// 是否处于读取中状态，用来判断是否展示骨架屏
import useStore from '@/store';
import {computed, ref} from 'vue';

const store = useStore();

export const useIfLoading = () => {
  const loading = ref<boolean>(true);

// 监控 ajaxCount 等于 0 时，即 ajax 请求全部结束时
// 设置 loading 为 false，关闭加载中状态，设置 pageInit 为 false，显示数据
  const getAjaxCount = computed(() => {
    return store.getAjaxCount;
  });
  const getPageInit = computed(() => {
    return store.getPageInit;
  });

// 监控 请求数量 超过零个说明正在请求中
  watch(getAjaxCount, (getAjaxCount, /*getPrevAjaxCount*/) => {
    // getAjaxCount > 0 表示有 ajax 请求正在执行中， pageInit 表示刚进入新页面， loading表示读取中状态
    if ((getAjaxCount > 0) && getPageInit && (loading.value === false)) {
      loading.value = true;
    }
    if (getAjaxCount === 0) {
      loading.value = false;
      store.updatePageInit({pageInit: false});
    }
  });

  return {
    loading
  };
};
