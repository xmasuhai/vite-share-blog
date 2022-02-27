import {defineComponent,} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTextarea';

export default defineComponent({
  name: 'CreateBlog',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    return {};
  },
  render() {
    return (
      <>
        <ArticleTextarea mainTitle="创建文章"
                         btnText="发布文章"/>
      </>
    );
  }

});
