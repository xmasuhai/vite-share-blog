import BlogListOfSelfOrOthers from '@/components/BlogListOfSelfOrOthers';
import {defineComponent,} from 'vue';

export default defineComponent({
  name: 'User',
  setup(/*props, ctx*/) {
    return {};
  },
  render() {
    return (
      <BlogListOfSelfOrOthers userStr="others"/>
    );
  }
});
