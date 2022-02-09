import {defineComponent,} from 'vue';

// Comps
import BlogHeader from '@/components/BlogHeader';
import BlogFooter from '@/components/BlogFooter';
// css modules
import layoutClass from '@/styles/layout.module.scss';

const LayoutProps = {
  isSHow: Boolean
};
export default defineComponent({
  name: 'Layout',
  props: LayoutProps,
  setup(/*props, ctx*/) {

    return {};
  },
  render() {
    const renderBlogHeader = () => {return (<BlogHeader class={layoutClass.blogHeader}/>);};
    const renderBlogFooter = () => {return (<BlogFooter class={layoutClass.blogFooter}/>);};
    return (
      <div class={layoutClass.app}>
        {renderBlogHeader()}
        <main class={layoutClass.blogMain}>
          <router-view/>
        </main>
        {renderBlogFooter()}
      </div>
    );
  }

});
