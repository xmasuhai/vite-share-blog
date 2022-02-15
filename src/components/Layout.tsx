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
    const renderBlogHeader = (cssModule: string) => {return (<BlogHeader class={cssModule}/>);};
    const renderBlogFooter = (cssModule: string) => {return (<BlogFooter class={cssModule}/>);};
    return (
      <div class={layoutClass.layout}>
        {renderBlogHeader(layoutClass.blogHeader)}
        <main class={layoutClass.blogMain}>
          <router-view/>
        </main>
        {renderBlogFooter(layoutClass.blogFooter)}
      </div>
    );
  }

});
