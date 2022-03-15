import {getDetail} from '@/api/blog';
import {defineComponent, PropType, ref,} from 'vue';
import useBlogStore from '@/store/modules/blog';
import cssCreateEdit from '@/styles/blog-create-edit.module.scss';
import {Button, Switch} from 'ant-design-vue';
import ArticleTextArea from '@/components/article/ArticleTextArea';
import {useRoute} from 'vue-router';

const ArticleTemplateProps = {
  mainTitle: String,
  btnText: String,
  mode: String as PropType<'edit' | 'create'>
};

export default defineComponent({
  name: 'ArticleTemplate',
  props: ArticleTemplateProps,
  emits: ['handleClick',],
  components: {},
  setup(props, ctx) {
    const BlogStore = useBlogStore();
    const title = ref('');
    const description = ref('');
    const content = ref('');
    const atIndex = ref<boolean>(false);

    const titleStore = computed(() => {
      return title.value;
    });
    const descriptionStore = computed(() => {
      return description.value;
    });
    const contentStore = computed(() => {
      return content.value;
    });
    const atIndexStore = computed(() => {
      return atIndex.value;
    });

    const route = useRoute();
    const blogId = ref(0);

    // 加载 blogId 对应的博客数据
    const loadBlog = async () => {
      // 从路径参数中读取 blogId 字段
      blogId.value = parseInt(route.params.blogId as string);

      // 由 blogId 发起请求，获取博客详情
      const res = await getDetail({blogId: blogId.value});
      const {title: titleData, description: descriptionData, content: contentData, atIndex: atIndexData} = res.data;
      BlogStore.setBlogFullInfo({titleData, descriptionData, contentData, atIndexData});

      // 更新页面数据
      title.value = titleData;
      description.value = descriptionData;
      content.value = contentData;
      atIndex.value = atIndexData as boolean;
    };

    // 将变更 patch 到 BlogStore 中
    watch([title, description, content, atIndex],
      ([title, description, content, atIndex]) => {
        BlogStore.$patch({
          title,
          description,
          content,
          atIndex
        });
      }/*, {immediate: true}*/);

    const handleClick = () => {
      ctx.emit('handleClick');
    };
    const changeTitle = (payload: string) => {
      title.value = payload;
    };
    const changeDescription = (payload: string) => {
      description.value = payload;
    };
    const changeContent = (payload: string) => {
      content.value = payload;
    };

    onBeforeMount(async () => {
      if (props.mode === 'edit') {
        await loadBlog();
      }
    });

    return {
      atIndex,
      titleStore,
      descriptionStore,
      contentStore,
      atIndexStore,
      handleClick,
      changeTitle,
      changeDescription,
      changeContent,
    };
  },
  render() {
    return (
      <section class={cssCreateEdit.createEdit}>
        <h1 class={cssCreateEdit.mainTitle}>
          {this.mainTitle}
        </h1>

        <ArticleTextArea subTitle="文章标题"
                         wordCount={30}
                         onInputValueChange={this.changeTitle}
                         dataString={this.titleStore}/>

        <ArticleTextArea subTitle="内容简介"
                         wordCount={30}
                         autoSize={{minRows: 2, maxRows: 2}}
                         onInputValueChange={this.changeDescription}
                         dataString={this.descriptionStore}/>

        <ArticleTextArea subTitle="文章内容(仅限Markdown格式)"
                         wordCount={30000}
                         autoSize={{minRows: 18, maxRows: 18}}
                         onInputValueChange={this.changeContent}
                         dataString={this.contentStore}/>

        {/* 首页展示开关 */}
        <div class={cssCreateEdit.switchBox}>
          <label class={cssCreateEdit.label} for="isShowAtIndex">
          <span class={cssCreateEdit.labelText}>
          是否展示到首页：
          </span>
            <Switch id="isShowAtIndex"
                    v-model:checked={this.atIndex}/>
          </label>
        </div>

        <Button class="blog-btn"
                onClick={this.handleClick}>
          {this.btnText}
        </Button>

      </section>
    );
  }

});
