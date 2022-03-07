import {defineComponent,} from 'vue';
import SvgIcon from '@/components/SvgIcon';
import emptyPageClass from '@/styles/empty-page.module.scss';

const EmptyPageProps = {
  isSHow: Boolean
};

export default defineComponent({
  name: 'EmptyPage',
  props: EmptyPageProps,
  components: {},
  setup(/*props, ctx*/) {

    return {};
  },
  render() {
    return (
      <section class={emptyPageClass.center}>
        <SvgIcon name="empty"
                 color="#999"
                 class={emptyPageClass.svgLogo}/>

        <span class={emptyPageClass.text}>
          没有数据
        </span>
      </section>
    );
  }

});
