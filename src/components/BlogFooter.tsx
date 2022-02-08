import blogClass from '@/styles/blog.module.scss';
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
      <footer class={blogClass.blogFooter}>
        <p>BlogFooter</p>
      </footer>
    );
  }
});
