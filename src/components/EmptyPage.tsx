import {defineComponent,} from 'vue';
import SvgIcon from '@/components/SvgIcon';
import emptyPageClass from '@/styles/empty-page.module.scss';
import {Button} from 'ant-design-vue';

const EmptyPageProps = {
  isSHow: Boolean
};

export default defineComponent({
  name: 'EmptyPage',
  props: EmptyPageProps,
  components: {},
  setup(/*props, ctx*/) {

    const mouseOverColor = ref('#333');

    const changeColor = () => {
      mouseOverColor.value = '#40a9ff';
    };

    return {
      mouseOverColor,
      changeColor
    };
  },
  render() {
    return (
      <section class={emptyPageClass.center}>
        <SvgIcon name="empty"
                 color="#999"
                 class={emptyPageClass.svgLogo}/>

        <span class={emptyPageClass.text}>
          还没有创建过博客
        </span>
        <router-link to={'/create'}>
          <Button class={emptyPageClass.create1stBlog}>
            <span class={emptyPageClass.btnText}>
              点击创建第一篇博客
            </span>
          </Button>

        </router-link>
      </section>
    );
  }

});
