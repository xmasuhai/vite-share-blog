import {defineComponent,} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTemplate';

export default defineComponent({
  name: 'EditBlog',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    return {};
  },
  render() {
    return (
      <>
        <ArticleTextarea mainTitle="编辑文章"
                         btnText="保存编辑"/>
      </>
    );
  }

});
