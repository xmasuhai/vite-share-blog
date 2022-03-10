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
    const {id: currentUserId} = authStore.getUser as blogUser;

    return {
      defaultSlot,
      id,
      currentUserId
    };
  },
  render() {
    const currentUser = (
      this.id === this.currentUserId
        ? {path: '/myblog'}
        : `/user/${this.id}`
    );

    const slots = {
      default: () => (
        <router-link to={currentUser}
                     class={cssDetail.userPage}
                     v-slots={this.defaultSlot}>
        </router-link>),
    };

    return (
      <>
        {slots.default ? slots.default() : ('用户主页链接')}
      </>
    );
  }

});
