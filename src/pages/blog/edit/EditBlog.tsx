import {defineComponent,} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTemplate';

export default defineComponent({
  name: 'EditBlog',
  props: {},
  components: {},
  beforeRouteLeave(/*to, from*/) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
    if (!answer) return false;
  },
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
