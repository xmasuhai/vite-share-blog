import cssDetail from '@/styles/blog-detail.module.scss';
import {defineComponent, ref} from 'vue';
import {useAuthStore} from '../../store/modules/auth/authStore';
import {blogUser} from '@/types/responseData';

const UserLinkProps = {
  userId: Number
};

export default defineComponent({
  name: 'UserLink',
  props: UserLinkProps,
  components: {},
  setup(props, {slots}) {
    const {default: defaultSlot,} = slots;
    const id = ref(props.userId);
    const authStore = useAuthStore();
    const {id: currentUserId} = authStore.getUser as blogUser || 1;

    //
    // 判断是否为用户页面 或 我的博客页面
    const currentUserStr = (
      id.value === currentUserId
        ? {path: '/myblog'}
        : `/user/${id.value}`
    );

    return {
      defaultSlot,
      id,
      currentUserId,
      currentUserStr
    };
  },
  render() {

    const slots = {
      default: () => (
        <router-link to={this.currentUserStr}
                     class={cssDetail.userPage}
                     v-slots={this.defaultSlot}>
        </router-link>),
    };

    return (
      <>
        {slots.default ? slots.default() : (<></>)}
      </>
    );
  }

});
