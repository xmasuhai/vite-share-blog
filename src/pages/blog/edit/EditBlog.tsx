import {updateBlog} from '@/api/blog';
import useBlogStore from '@/store/modules/blog';
import {message} from 'ant-design-vue';
import {defineComponent,} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTemplate';
import {useRouter,} from 'vue-router';

export default defineComponent({
  name: 'EditBlog',
  props: {},
  components: {},
  beforeRouteLeave(/*to, from*/) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
    if (!answer) return false;
  },
  setup(/*props, ctx*/) {
    const BlogStore = useBlogStore();
    const popMessage = inject<typeof message>('$message');
    const router = useRouter();
    const blogId = ref(1);

    // TODO 将所有逻辑 合并到 store 中
    const postEditedBlog = () => {
      console.log('blogId.value', blogId.value);
      console.log('BlogStore.getBlogFullInfo', BlogStore.getBlogFullInfo);

      updateBlog({blogId: blogId.value}, BlogStore.getBlogFullInfo)
        .then(res => {
          popMessage && popMessage.success(res.msg);
          return (res.data && router.push({path: `/detail/${res.data.id}`}));
        });
    };

    return {
      postEditedBlog
    };
  },
  render() {
    return (
      <>
        <ArticleTextarea mainTitle="编辑文章"
                         btnText="保存编辑"
                         onHandleClick={this.postEditedBlog}
                         mode="edit"/>
      </>
    );
  }

});
