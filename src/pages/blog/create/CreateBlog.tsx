import {defineComponent,} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTextarea';
import blog from '@/api/blog';

export default defineComponent({
  name: 'CreateBlog',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const createBlog = () => {
      /*
      blog.createBlog({
      title: this.title,
      content: this.content,
      description: this.description,
      atIndex: this.atIndex})
        .then(res => {
          this.$message.success(res.msg)
          this.$router.push({ path: `/detail/${res.data.id}`})
        })
      */
    };
    return {
      createBlog
    };
  },
  render() {
    return (
      <>
        <ArticleTextarea mainTitle="创建文章"
                         btnText="发布文章"
                         onHandleClick={this.createBlog}/>
      </>
    );
  }

});
