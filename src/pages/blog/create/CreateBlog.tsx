import {defineComponent,} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTemplate';
import {createBlog} from '@/api/blog';
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

    // TODO 将所有逻辑 合并到 store 中
    const postBlog = () => {
      createBlog(BlogStore.getBlogFullInfo)
        .then(res => {
          popMessage && popMessage.success(res.msg);
          return (res.data && router.push({path: `/detail/${res.data.id}`}));
        });
    };
    return {
      postBlog
    };
  },
  render() {
    return (
      <ArticleTextarea mainTitle="创建文章"
                       btnText="发布文章"
                       onHandleClick={this.postBlog}/>
    );
  }

});
