import {defineComponent, ref} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTextarea';

export default defineComponent({
  name: 'CreateBlog',
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
        <ArticleTextarea title="创建文章"
                         btnText="发布文章"/>
      </>
    );
  }

});
