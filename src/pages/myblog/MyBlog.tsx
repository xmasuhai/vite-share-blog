import BlogListOfSelfOrOthers from '@/components/BlogListOfSelfOrOthers';
import {defineComponent,} from 'vue';

export default defineComponent({
  name: 'MyBlog',
  setup(/*props, ctx*/) {
    return {};
  },
  render() {
    return (
      <BlogListOfSelfOrOthers userStr="self"/>
    );
  }
});
