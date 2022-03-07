import cssDetail from '@/styles/blog-detail.module.scss';
import {defineComponent, ref} from 'vue';

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
    return {
      defaultSlot,
      id
    };
  },
  render() {
    const slots = {
      default: () => (
        <router-link to={`/user/${this.id}`}
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
