import useStore from '@/store';
import {useAuthStore} from '../store/modules/auth/authStore';
import {defineComponent, computed,} from 'vue';
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
    const store = useStore();
    const authStore = useAuthStore();

    const isShowHeaderFooter = ref(true);

    const ifLoginComp = computed(() => {
      return (['Login', 'Register'].includes(store.getRouterCompName));
    });

    const isHideHeader = computed(() => {
      return (isShowHeaderFooter.value
          ? [layoutClass.blogHeader]
          : [layoutClass.blogHeader, layoutClass.isHideHeader]
      );
    });

    const isHideFooter = computed(() => {
      return (isShowHeaderFooter.value
          ? [layoutClass.blogFooter]
          : [layoutClass.blogFooter, layoutClass.isHideFooter]
      );
    });

    const cssBlogMain = computed(() => {
      return authStore.getIsLogin
        ? [layoutClass.blogMain]
        : [layoutClass.blogMain, layoutClass.logout];
    });

    // 判断 <router-view/> 中的组件是否为 register 或 login
    // 使得 对应组件居中，否则按顺序按 start 开头位置排列
    const cssBlogBody = computed(() => {
      return ifLoginComp.value
        ? [layoutClass.layout]
        : [layoutClass.layout, layoutClass.isBlogDetail];
    });

    return {
      ifLoginComp,
      cssBlogBody,
      cssBlogMain,
      isShowHeaderFooter,
      isHideHeader,
      isHideFooter
    };
  },
  render() {
    const renderBlogHeader = (cssModule: string) => {return (<BlogHeader class={cssModule}/>);};
    const renderBlogFooter = (cssModule: string) => {return (<BlogFooter class={cssModule}/>);};
    const renderBlogBody = (cssModule: string) => {
      return (
        <BlogBody class={cssModule}
                  onShowHeaderFooter={(showHeaderFooter) => {
                    this.isShowHeaderFooter = showHeaderFooter;
                  }}/>
      );
    };

    return (
      <div class={classNames(...this.cssBlogBody)}>
        {renderBlogHeader(classNames(this.isHideHeader))}
        {renderBlogBody(classNames(this.cssBlogMain))}
        {renderBlogFooter(classNames(this.isHideFooter))}
      </div>
    );
  }

});
