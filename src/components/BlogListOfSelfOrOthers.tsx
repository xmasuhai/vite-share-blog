import useGetData_RenderDOM from '@/hooks/useGetData_RenderDOM';
import {defineComponent, PropType} from 'vue';

const BlogListOfSelfOrOthersProps = {
  userStr: {
    type: String as PropType<'self' | 'others'>,
    required: true,
  },
};

export default defineComponent({
  name: 'BlogListOfSelfOrOthers',
  props: BlogListOfSelfOrOthersProps,
  setup(props/*, ctx*/) {
    const user = ref(props.userStr);

    const {
      showEmptyPage,
      renderUserInfo,
      renderEmptyPage,
      renderFullPage,
    } = useGetData_RenderDOM(user.value as ('self' | 'others'));

    return {
      showEmptyPage,
      renderUserInfo,
      renderEmptyPage,
      renderFullPage,
    };
  },
  render() {
    return (
      <>
        {this.renderUserInfo()}
        {this.showEmptyPage
          ? this.renderEmptyPage()
          : this.renderFullPage()
        }
      </>
    );
  }

});
