import {defineComponent, computed,} from 'vue';
import classNames from 'classnames';
import useAuthStore from '@/store/modules/auth';

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
    const store = useAuthStore();

    // 判断 <router-view/> 中的组件是否为 register 或 login
    // 使得 对应组件居中，否则按顺序按 start 开头位置排列
    const cssBlogBody = computed(() => {
      return store.isLogin
        ? [layoutClass.layout]
        : [layoutClass.layout, layoutClass.isBlogDetail];
    });

    return {
      cssBlogBody
    };
  },
  render() {
    const renderBlogHeader = (cssModule: string) => {return (<BlogHeader class={cssModule}/>);};
    const renderBlogFooter = (cssModule: string) => {return (<BlogFooter class={cssModule}/>);};
    const renderBlogBody = (cssModule: string) => {
      return (
        <BlogBody class={cssModule}/>
      );
    };
    return (
      <div class={classNames(...this.cssBlogBody)}>
        {renderBlogHeader(layoutClass.blogHeader)}
        {renderBlogBody(layoutClass.blogMain)}
        {renderBlogFooter(layoutClass.blogFooter)}
      </div>
    );
  }

});
