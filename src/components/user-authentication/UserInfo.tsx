import {defineComponent,} from 'vue';
import cssUser from '@/styles/blog-user.module.scss';

const UserInfoProps = {
  username: {type: String, required: true},
  avatar: {type: String, required: true},
};

export default defineComponent({
  name: 'UserInfo',
  props: UserInfoProps,
  components: {},
  setup(props/*, ctx*/) {
    const name = ref(props.username);
    const avatarUrl = ref(props.avatar);

    return {
      name,
      avatarUrl
    };
  },
  render() {
    return (
      <section class={cssUser.userInfo}>
        {/* 作者 */}
        <img src={this.avatarUrl}
             alt={this.name}
             class={cssUser.avatar}/>
        <h3 class={cssUser.name}>
          {this.name}
        </h3>
      </section>
    );
  }

});
