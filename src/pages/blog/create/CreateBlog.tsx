import {defineComponent,} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTemplate';
import blog from '@/api/blog';
import useBlogStore from '@/store/modules/blog';
import {message} from 'ant-design-vue';
import {useRouter} from 'vue-router';

export default defineComponent({
  name: 'CreateBlog',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const BlogStore = useBlogStore();
    const popMessage = inject<typeof message>('$message');
    const router = useRouter();

    const createBlog = () => {
      blog.createBlog(BlogStore.getBlogFullInfo)
        .then(res => {
          popMessage && popMessage.success(res.msg);
          return router.push({path: `/detail/${res.data.id}`});
        });
    };
    return {
      createBlog
    };
  },
  render() {
    return (
      <ArticleTextarea mainTitle="创建文章"
                       btnText="发布文章"
                       onHandleClick={this.createBlog}/>
    );
  }

});
