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

    // 判断子节点是否为 登录注册 组件
    const ifLoginComp = computed(() => {
      return (['Login', 'Register'].includes(store.getRouterCompName));
    });

    // CSS module computed with classNames
    const showHeaderFooter = (HeaderFooter: 'Header' | 'Footer') => {
      return {
        [HeaderFooter]: computed(() => {
          return (isShowHeaderFooter.value
              ? [layoutClass[`blog${HeaderFooter}`]]
              : [layoutClass[`blog${HeaderFooter}`], layoutClass[`isHide${HeaderFooter}`]]
          );
        }),
      };
    };

    const isShowHeader = showHeaderFooter('Header')['Header'];

    const isShowFooter = showHeaderFooter('Footer')['Footer'];

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
      isShowHeader,
      isShowFooter,
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
        {renderBlogHeader(classNames(this.isShowHeader))}
        {renderBlogBody(classNames(this.cssBlogMain))}
        {renderBlogFooter(classNames(this.isShowFooter))}
      </div>
    );
  }

});
