import {useStore} from '@/store/store';
import {getCurrentInstance} from 'vue';

export default function () {
  const store = useStore();
  const instance = getCurrentInstance();
  // 将组件的name属性保存到 store 中
  instance?.type?.name && (store.routerCompName = instance.type.name);
}
