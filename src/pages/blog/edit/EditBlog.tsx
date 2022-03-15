import {updateBlog} from '@/api/blog';
import useBlogStore from '@/store/modules/blog';
import {message} from 'ant-design-vue';
import {defineComponent, ref} from 'vue';
import ArticleTextarea from '@/components/article/ArticleTemplate';
import {useRouter, useRoute} from 'vue-router';

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
    const route = useRoute();
    const blogId = ref<number>(0);

    blogId.value = parseInt(route.params.blogId as string);

    // TODO 将所有逻辑 合并到 store 中
    const postEditedBlog = () => {
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
