import {defineComponent, onMounted, getCurrentInstance, computed,} from 'vue';
import classNames from 'classnames';

// Comps
import BlogHeader from '@/components/BlogHeader';
import BlogFooter from '@/components/BlogFooter';
import BlogBody from '@/components/BlogBody';

// css modules
import layoutClass from '@/styles/layout.module.scss';

const LayoutProps = {
  isSHow: Boolean
};
export default defineComponent({
  name: 'Layout',
  props: LayoutProps,
  setup(/*props, ctx*/) {
    const instance = getCurrentInstance();
    const hasBlogBody = ref<boolean>(false);
    const cssBlogBody = computed(() => {
      // console.log(hasBlogBody.value);
      return hasBlogBody.value
        ? [layoutClass.layout, layoutClass.isBlogDetail]
        : [layoutClass.layout];
    });

    onMounted(() => {
      hasBlogBody.value = ((instance?.subTree.children as Array<any>)[1].type.name === 'BlogBody');

    });

    return {
      cssBlogBody
    };
  },
  render() {
    const renderBlogHeader = (cssModule: string) => {return (<BlogHeader class={cssModule}/>);};
    const renderBlogFooter = (cssModule: string) => {return (<BlogFooter class={cssModule}/>);};
    const renderBlogBody = (cssModule: string) => {return (<BlogBody class={cssModule}/>);};
    return (
      <div class={classNames(...this.cssBlogBody)}>
        {renderBlogHeader(layoutClass.blogHeader)}
        {renderBlogBody(layoutClass.blogMain)}
        {renderBlogFooter(layoutClass.blogFooter)}
      </div>
    );
  }

});
