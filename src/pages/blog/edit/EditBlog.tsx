import {defineComponent,} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTextarea';

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
        <ArticleTextarea mainTitle="保存编辑"
                         btnText="保存编辑"/>
      </>
    );
  }

});
