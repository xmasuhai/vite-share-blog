import SvgIcon from '@/components/SvgIcon';
import blogFooterClass from '@/styles/blog-footer.module.scss';
import {defineComponent,} from 'vue';

const BlogFooterProps = {
  isSHow: Boolean
};

export default defineComponent({
  name: 'BlogFooter',
  props: BlogFooterProps,
  components: {},
  setup(/*props, ctx*/) {

    return {};
  },
  render() {
    return (
      <footer class={blogFooterClass.blogFooter}>
        <a href="https://github.com/xmasuhai/vite-share-blog">
          <SvgIcon name="github"
                   class={blogFooterClass.svgLogo}/>
          <span class={blogFooterClass.link}>
            @github.com/xmasuhai/vite-share-blog
          </span>
        </a>
      </footer>
    );
  }
});
