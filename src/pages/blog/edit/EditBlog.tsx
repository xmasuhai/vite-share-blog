import {defineComponent, ref} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTextarea';

export default defineComponent({
  name: 'EditBlog',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const description = ref('');
    const articleText = ref('');
    return {
      description,
      articleText
    };
  },
  render() {
    return (
      <>
        <ArticleTextarea title="保存编辑"
                         btnText="保存编辑"/>
      </>
    );
  }

});
