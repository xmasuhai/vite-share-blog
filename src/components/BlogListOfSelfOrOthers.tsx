import useRenderEmptyPage from '@/hooks/renderFn/useRenderEmptyPage';
import useGetData_RenderDOM from '@/hooks/renderFn/useGetData_RenderDOM';
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
      renderFullPage,
    } = useGetData_RenderDOM(user.value as ('self' | 'others'));

    return {
      showEmptyPage,
      renderUserInfo,
      renderFullPage,
    };
  },
  render() {
    return (
      <>
        {this.renderUserInfo()}
        {
          this.showEmptyPage
            ? useRenderEmptyPage()
            : this.renderFullPage()
        }
      </>
    );
  }

});
