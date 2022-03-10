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
    const isMyBlogPage = ref(false);
    const route = useRoute();
    watchEffect(() => {
      isMyBlogPage.value = !route.fullPath.includes('user');
    });

    return {
      isMyBlogPage
    };
  },
  render() {
    const renderCreateBlog = () => {
      return (
        <router-link to={'/create'}>
          <Button class={emptyPageClass.createBlog}>
            <span class={emptyPageClass.btnText}>
              点击创建第一篇博客
            </span>
          </Button>
        </router-link>);
    };

    const emptyTips = this.isMyBlogPage
      ? '还没有创建过博客'
      : '此用户比较懒，还没有发布博客';

    return (
      <section class={emptyPageClass.center}>
        <SvgIcon name="empty"
                 color="#999"
                 class={emptyPageClass.svgLogo}/>

        <span class={emptyPageClass.text}>
          {emptyTips}
        </span>
        {this.isMyBlogPage && renderCreateBlog()}
      </section>
    );
  }

});
